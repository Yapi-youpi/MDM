import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DevicesConfigService } from '../../../shared/services/devices-config.service';
import { DevicesConfig, Permissions } from '../../../interfaces/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';
import { App } from '../../../shared/types/apps';
import { AppState } from '../../../shared/types/states';
import { AppsService } from '../../../shared/services/apps.service';
import { alertService } from '../../../shared/services';
import { AssetService } from '../../../shared/services/asset.service';
import Compressor from 'compressorjs';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  public title = 'Конфигурации / ';
  public config!: DevicesConfig;
  public configForm: FormGroup;
  public apps: App[] = [];
  // public restrictions: string[] = [];
  public restrictionList: Permissions;
  public isModalAddAppOpen = false;
  public manageBrightness = false;
  public file_input!: any;
  public file_placeholder!: Element;
  public bgImg!: string;
  public bgImage = '';

  private editedApps: App[] = [];
  private initialAppList: string[] = [];

  constructor(
    public userService: UserService,
    public appsService: AppsService,
    private alert: alertService,
    private route: ActivatedRoute,
    private configService: DevicesConfigService,
    private router: Router,
    private elementRef: ElementRef,
    private asset: AssetService
  ) {
    this.title = this.title + this.asset.configName;
    this.restrictionList = {
      no_install_apps: 'установка приложений',
      no_uninstall_apps: 'удаление приложений',
      no_config_credentials: 'настройка пользователя',
      no_config_location: 'настройка местоположения',
      no_config_tethering: 'настройка точки доступа',
      no_factory_reset: 'сброс настроек',
      no_fun: 'развлекательные приложения',
    };
    this.configForm = new FormGroup({
      autoUpdate: new FormControl(false, Validators.required),
      autoBrightness: new FormControl(false, Validators.required),
      backgroundColor: new FormControl('', Validators.required),
      blockStatusBar: new FormControl(false, Validators.required),
      bluetooth: new FormControl(true, Validators.required),
      brightness: new FormControl(255, Validators.required),
      configUpdateTime: new FormControl('00:00', Validators.required),
      description: new FormControl('', Validators.required),
      desktopHeader: new FormControl('', Validators.required),
      desktopHeaderTemplate: new FormControl('', Validators.required),
      disableScreenshots: new FormControl(false, Validators.required),
      GPS: new FormControl(true, Validators.required),
      iconSize: new FormControl('SMALL', Validators.required),
      keepaliveTime: new FormControl(60000000000, Validators.required),
      kioskMode: new FormControl(false, Validators.required),
      lockSafeSettings: new FormControl(true, Validators.required),
      lockVolume: new FormControl(false, Validators.required),
      mainApp: new FormControl('', Validators.required),
      manageTimeout: new FormControl(false, Validators.required),
      manageVolume: new FormControl(false, Validators.required),
      mobileData: new FormControl(true, Validators.required),
      mobileEnrollment: new FormControl(false, Validators.required),
      name: new FormControl('', Validators.required),
      nfcState: new FormControl(true, Validators.required),
      orientation: new FormControl(0, Validators.required),
      pushOptions: new FormControl('all', Validators.required),
      scheduleAppUpdate: new FormControl(false, Validators.required),
      systemUpdateType: new FormControl(0, Validators.required),
      systemUpdateTime: new FormControl('00:00', Validators.required),
      textColor: new FormControl('', Validators.required),
      timeout: new FormControl(30000000000, Validators.required),
      usbStorage: new FormControl(false, Validators.required),
      useDefaultDesignSettings: new FormControl(false, Validators.required),
      volume: new FormControl(90, Validators.required),
      wifi: new FormControl(true, Validators.required),
      wifiPassword: new FormControl('', Validators.required),
      wifiSSID: new FormControl('', Validators.required),
      wifiSecurityType: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.getConfig();
  }

  getApps() {
    this.appsService
      .get('all')
      .then((res: AppState) => {
        if (res.success) {
          this.apps = res.app ? res.app : [];
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getConfig() {
    const id = this.route.snapshot.paramMap.get('id') || 'default';
    this.configService
      .getConfig(id)
      .then((res) => {
        if (res.length > 0) {
          this.config = Object.assign(res[0]);
          this.initialAppList = res[0].applications || [];
          console.log(this.config);
        }
      })
      .then(() => {
        let i = interval(200).subscribe(() => {
          i.unsubscribe();
          this.file_placeholder =
            this.elementRef.nativeElement.querySelector('.bg-placeholder');
          this.file_input =
            this.elementRef.nativeElement.querySelector('#input-bg');
          this.setConfig();
        });
      })
      .catch((err) => console.log(err));
  }

  // getRestrictions() {
  //   this.configService
  //     .getRestrictions()
  //     .then((res) => {
  //       this.restrictions = res.split(', ');
  //     })
  //     .catch((err) => console.log(err));
  // }

  setConfig() {
    this.configForm.patchValue(this.config);

    if (!this.configForm.value.textColor) {
      this.configForm.patchValue({ textColor: '#ffffff' });
    }
    if (!this.configForm.value.backgroundColor) {
      this.configForm.patchValue({ backgroundColor: '#557ebe' });
    }
    if (!this.configForm.value.wifiSecurityType) {
      this.configForm.patchValue({ wifiSecurityType: 'NONE' });
    }

    this.getApps();
    // this.getRestrictions();
    if (this.config) {
      this.config.applications = this.initialAppList;
      // две строки ниже должны быть именно в таком порядке!
      this.clearInputFile();
      this.bgImg = this.config.backgroundImageUrl;
    }
    if (this.bgImg) {
      const span = this.file_placeholder.querySelector('.filename');
      if (span)
        span.innerHTML =
          this.bgImg
            .match(/([^\/]+\.jpg)$/)
            ?.toString()
            .slice(-21) || '';
    }
  }

  editConfig() {
    const config = Object.assign(this.config, this.configForm.value);
    // дополнительная проверка на одновременное отключение интернета и wifi
    if (!config.wifi && !config.mobileData) {
      // включаем интернет, если пользователю удалось отключить и интернет, и wifi
      config.mobileData = !config.mobileData;
    }
    this.configService
      .editConfig(config)
      .then((res) => {
        console.log(res);
        const saveBtn = document.querySelector('.save-btn');
        saveBtn?.classList.add('save-btn--success');
        let i = interval(2000).subscribe(() => {
          saveBtn?.classList.remove('save-btn--success');
          i.unsubscribe();
        });

        // this.configForm.reset();
      })
      .catch((err) => console.log(err));

    if (this.editedApps.length > 0) {
      this.editedApps.map((app) => {
        this.appsService
          .edit(app)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      });
    }

    if (this.bgImage) {
      this.configService
        .uploadWallpaper(this.config.ID, this.bgImage)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }

  editApp(id: string) {
    const currentApp = this.apps.find((app) => app.ID === id);
    if (currentApp) {
      this.editedApps.push(currentApp);
    }
  }

  toggleApp(app) {
    const [id, value] = app;
    if (value === '0') {
      this.config.removedApps.push(id);
      this.config.installedApps = this.config.installedApps.filter(
        (app) => app != id
      );
    }
    if (value === '1') {
      this.config.installedApps.push(id);
      this.config.removedApps = this.config.removedApps.filter(
        (app) => app != id
      );
    }
  }

  goBack() {
    this.router.navigateByUrl('config').then();
  }

  toggleBrightness() {
    this.manageBrightness = !this.manageBrightness;
  }

  /* toggle tabs */

  setActive(event) {
    const target = event.target;
    const tabs = document.querySelectorAll('.tab');
    const tabsContent = document.querySelectorAll('.form__tab');

    if (target && target.matches('.tab')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }

    function hideTabContent() {
      tabsContent.forEach((item) => {
        // @ts-ignore
        item.style.display = 'none';
      });
      tabs.forEach((item) => {
        item.classList.remove('tab--active');
      });
    }

    function showTabContent(i = 0) {
      // @ts-ignore
      tabsContent[i].style.display = 'flex';
      tabs[i].classList.add('tab--active');
    }
  }

  changeRestrictions(event) {
    if (event.target.checked) {
      this.config.restrictions =
        this.config.restrictions.length !== 0
          ? `${this.config.restrictions}, ${event.target.value}`
          : event.target.value;
    } else {
      let arr = this.config.restrictions.split(', ');
      const index = arr.findIndex((i) => i === event.target.value);
      arr.splice(index, 1);
      this.config.restrictions = arr.join(', ');
    }
  }

  addApp(addedApps: string[]) {
    this.config.applications = this.config.applications?.concat(addedApps);
    this.isModalAddAppOpen = false;
  }

  addBgFile(event: Event) {
    // @ts-ignore
    const file = event.target.files[0];

    if (file) {
      new Compressor(file, {
        mimeType: 'image/jpeg',
        success(res) {
          convertTo64(res);
        },
        error(err) {
          console.log(err.message);
        },
      });

      this.bgImg = window.URL.createObjectURL(file);

      const convertTo64 = (img) => {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = () => {
          if (reader.result) {
            this.bgImage = reader.result
              .toString()
              .replace(/^data:image\/[a-z]+;base64,/, '');
          }
        };
      };

      const span = this.file_placeholder.querySelector('.filename');
      if (span) span.innerHTML = file.name;
    }
  }

  clearInputFile() {
    const input = this.file_input;
    const placeholder = this.file_placeholder;

    if (input && placeholder) {
      if (
        this.config.backgroundImageUrl &&
        this.config.backgroundImageUrl === this.bgImg
      ) {
        this.configService
          .removeWallpaper(this.config.ID)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        this.config.backgroundImageUrl = '';
      }
      this.bgImg = '';
      this.bgImage = '';
      input.value = '';
    }
  }

  showAlert() {
    this.alert.show({
      title: 'Предупреждение!',
      content:
        'Отключение GPS исключает возможность отображения на карте устройств данной конфигурации',
      type: 'warning',
    });
  }
}

/*  Enter in the address field
 chrome://flags/#block -Secure private network requests ,
 change the option to disable  */
