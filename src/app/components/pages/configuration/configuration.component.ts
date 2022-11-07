import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';
import { IApp } from '../../../shared/types';
import { alertService } from '../../../shared/services';
import { AssetService } from '../../../shared/services/asset.service';
import Compressor from 'compressorjs';
import { AppClass } from '../../../shared/classes/apps/app.class';
import { AppSelectedClass } from '../../../shared/classes/apps/app-selected.class';
import { IConfig } from '../../../shared/types';
import { ConfigClass } from '../../../shared/classes/configs/config.class';
import { edit } from '../../../shared/services/forms/configs';
import { IPermissions } from '../../../shared/types';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  public title = 'Конфигурации / ';
  public config!: IConfig;
  // public restrictions: string[] = [];
  public restrictionList: IPermissions;
  public isModalAddAppOpen = false;
  public manageBrightness = false;
  public file_input!: any;
  public file_placeholder!: Element;
  public bgImg!: string;
  public bgImage = '';

  private editedApps: IApp[] = [];
  private initialAppList: string[] = [];

  constructor(
    public userService: UserService,
    private apps: AppClass,
    private selected: AppSelectedClass,
    private alert: alertService,
    private route: ActivatedRoute,
    private configClass: ConfigClass,
    private router: Router,
    private elementRef: ElementRef,
    private asset: AssetService,
    private form: edit
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
  }

  get _form() {
    return this.form.form;
  }
  get _systemUpdateType() {
    return this._form.get('systemUpdateType');
  }
  get _mobileData() {
    return this._form.get('mobileData');
  }
  get _wifi() {
    return this._form.get('wifi');
  }
  get _manageVolume() {
    return this._form.get('manageVolume');
  }
  get _manageTimeout() {
    return this._form.get('manageTimeout');
  }
  get _autoBrightness() {
    return this._form.get('autoBrightness');
  }
  get _useDefaultDesignSettings() {
    return this._form.get('useDefaultDesignSettings');
  }
  get _desktopHeader() {
    return this._form.get('desktopHeader');
  }
  get _desktopHeaderTemplate() {
    return this._form.get('desktopHeaderTemplate');
  }
  get _description() {
    return this._form.get('description');
  }
  get _backgroundColor() {
    return this._form.get('backgroundColor');
  }
  get _textColor() {
    return this._form.get('textColor');
  }
  get _iconSize() {
    return this._form.get('iconSize');
  }
  get _orientation() {
    return this._form.get('orientation');
  }

  ngOnInit() {
    this.getConfig();
  }

  getConfig() {
    const id = this.route.snapshot.paramMap.get('id') || 'default';
    this.configClass
      .get(id)
      .then((res) => {
        if (res && this.configClass.array.length > 0) {
          this.config = Object.assign(this.configClass.array[0]);
          this.initialAppList = this.configClass.array[0].applications || [];
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
    // this.configForm.patchValue(this.config);
    this.form.updateWithConfig(this.config);

    if (!this.form.values.textColor) {
      this.form.form.patchValue({ textColor: '#ffffff' });
    }
    if (!this.form.values.backgroundColor) {
      this.form.form.patchValue({ backgroundColor: '#557ebe' });
    }
    if (!this.form.values.wifiSecurityType) {
      this.form.form.patchValue({ wifiSecurityType: 'NONE' });
    }

    this.apps.get('all', true).then();
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
    const config = { ...this.config, ...this.form.values };
    // дополнительная проверка на одновременное отключение интернета и wifi
    if (!config.wifi && !config.mobileData) {
      // включаем интернет, если пользователю удалось отключить и интернет, и wifi
      config.mobileData = !config.mobileData;
    }
    this.configClass.edit(config).then((res) => {
      if (res) {
        const saveBtn = document.querySelector('.save-btn');
        saveBtn?.classList.add('save-btn--success');
        let i = interval(2000).subscribe(() => {
          saveBtn?.classList.remove('save-btn--success');
          i.unsubscribe();
        });
      }
    });

    if (this.editedApps.length > 0) {
      this.editedApps.forEach((app) => {
        this.apps.edit(app.ID, app).then((res) => console.log(res));
      });
    }

    if (this.bgImage) {
      this.configClass.uploadWallpaper(this.config.ID, this.bgImage).then();
    }
  }

  editApp(app: IApp) {
    const currentApp = this.apps.rawArray.find((a) => a.ID === app.ID);
    if (currentApp) {
      this.editedApps.push(currentApp);
    }
    // this.apps.setCurrent(app);
    // this.editedApps.push(currentApp);
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
    this.router.navigateByUrl('configs').then();
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

  addApps() {
    this.config.applications = this.config.applications?.concat(
      this.selected.selectedIDs
    );
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
        this.configClass.removeWallpaper(this.config.ID).then();
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
