import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';
import { IApp, IConfig, IPermissions } from '../../../shared/types';
import { alertService } from '../../../shared/services';
import { AssetService } from '../../../shared/services/asset.service';
import Compressor from 'compressorjs';
import {
  AppClass,
  AppSelectedClass,
  ConfigClass,
} from '../../../shared/classes';
import { edit } from '../../../shared/services/forms/configs';

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
    public _user: UserService,
    private _apps: AppClass,
    private _appsSelected: AppSelectedClass,
    private _alert: alertService,
    private _route: ActivatedRoute,
    private _config: ConfigClass,
    private _router: Router,
    private _elRef: ElementRef,
    private _asset: AssetService,
    private _form: edit
  ) {
    this.title = this.title + this._asset.configName;
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

  get form() {
    return this._form.form;
  }
  get systemUpdateType() {
    return this.form.get('systemUpdateType');
  }
  get mobileData() {
    return this.form.get('mobileData');
  }
  get wifi() {
    return this.form.get('wifi');
  }
  get manageVolume() {
    return this.form.get('manageVolume');
  }
  get manageTimeout() {
    return this.form.get('manageTimeout');
  }
  get autoBrightness() {
    return this.form.get('autoBrightness');
  }
  get useDefaultDesignSettings() {
    return this.form.get('useDefaultDesignSettings');
  }
  get desktopHeader() {
    return this.form.get('desktopHeader');
  }
  get desktopHeaderTemplate() {
    return this.form.get('desktopHeaderTemplate');
  }
  get description() {
    return this.form.get('description');
  }
  get backgroundColor() {
    return this.form.get('backgroundColor');
  }
  get textColor() {
    return this.form.get('textColor');
  }
  get iconSize() {
    return this.form.get('iconSize');
  }
  get orientation() {
    return this.form.get('orientation');
  }

  ngOnInit() {
    this.getConfig();
  }

  getConfig() {
    const id = this._route.snapshot.paramMap.get('id') || 'default';
    this._config
      .get(id)
      .then((res) => {
        if (res && this._config.array.length > 0) {
          this.config = Object.assign(this._config.array[0]);
          this.initialAppList = this._config.array[0].applications || [];
        }
      })
      .then(() => {
        let i = interval(200).subscribe(() => {
          i.unsubscribe();
          this.file_placeholder =
            this._elRef.nativeElement.querySelector('.bg-placeholder');
          this.file_input =
            this._elRef.nativeElement.querySelector('#input-bg');
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
    this._form.updateWithConfig(this.config);

    if (!this._form.values.textColor) {
      this._form.form.patchValue({ textColor: '#ffffff' });
    }
    if (!this._form.values.backgroundColor) {
      this._form.form.patchValue({ backgroundColor: '#557ebe' });
    }
    if (!this._form.values.wifiSecurityType) {
      this._form.form.patchValue({ wifiSecurityType: 'NONE' });
    }

    this._apps.get('all', true).then();
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
    const config = { ...this.config, ...this._form.values };
    // дополнительная проверка на одновременное отключение интернета и wifi
    if (!config.wifi && !config.mobileData) {
      // включаем интернет, если пользователю удалось отключить и интернет, и wifi
      config.mobileData = !config.mobileData;
    }
    this._config.edit(config).then((res) => {
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
        this._apps.edit(app.ID, app).then((res) => console.log(res));
      });
    }

    if (this.bgImage) {
      this._config.uploadWallpaper(this.config.ID, this.bgImage).then();
    }
  }

  editApp(app: IApp) {
    const currentApp = this._apps.rawApps.find((a) => a.ID === app.ID);
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
    this._router.navigateByUrl('configs').then();
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
      this._appsSelected.selectedIDs
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
        this._config.removeWallpaper(this.config.ID).then();
        this.config.backgroundImageUrl = '';
      }
      this.bgImg = '';
      this.bgImage = '';
      input.value = '';
    }
  }

  showAlert() {
    this._alert.show({
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
