import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DevicesConfigService } from '../../../shared/services/devices-config.service';
import { DevicesConfig } from '../../../interfaces/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';
import { App } from '../../../shared/types/apps';
import { AppState } from '../../../shared/types/states';
import { AppsService } from '../../../shared/services/apps.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  public config!: DevicesConfig;
  public configForm: FormGroup;
  public apps: App[] = [];
  public restrictions: string[] = [];
  public isModalAddAppOpen = false;

  private editedApps: App[] = [];
  private initialAppList: string[] = [];

  constructor(
    public userService: UserService,
    public appsService: AppsService,
    private route: ActivatedRoute,
    private configService: DevicesConfigService,
    private router: Router
  ) {
    this.configForm = new FormGroup({
      GPS: new FormControl(true, Validators.required),
      autoUpdate: new FormControl(false, Validators.required),
      autoBrightness: new FormControl(false, Validators.required),
      backgroundColor: new FormControl('', Validators.required),
      backgroundImageUrl: new FormControl('', Validators.required),
      blockStatusBar: new FormControl(false, Validators.required),
      bluetooth: new FormControl(true, Validators.required),
      brightness: new FormControl(255, Validators.required),
      description: new FormControl('', Validators.required),
      desktopHeader: new FormControl('', Validators.required),
      desktopHeaderTemplate: new FormControl('', Validators.required),
      disableScreenshots: new FormControl(false, Validators.required),
      iconSize: new FormControl('SMALL', Validators.required),
      keepaliveTime: new FormControl(60000000000, Validators.required),
      systemUpdateType: new FormControl(0, Validators.required),
      systemUpdateTime: new FormControl('00:00', Validators.required),
      lockSafeSettings: new FormControl(true, Validators.required),
      kioskMode: new FormControl(false, Validators.required),
      mainApp: new FormControl('', Validators.required),
      lockVolume: new FormControl(false, Validators.required),
      manageTimeout: new FormControl(false, Validators.required),
      manageVolume: new FormControl(false, Validators.required),
      mobileData: new FormControl(true, Validators.required),
      mobileEnrollment: new FormControl(false, Validators.required),
      name: new FormControl('', Validators.required),
      orientation: new FormControl(0, Validators.required),
      pushOptions: new FormControl('all', Validators.required),
      scheduleAppUpdate: new FormControl(false, Validators.required),
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
    let i = interval(1000).subscribe(() => {
      if (this.userService.token) {
        i.unsubscribe();
        this.getConfig();
      }
    });
  }

  getApps() {
    this.appsService
      .get('all')
      .then((res: AppState) => {
        console.log(res);
        if (res.success) {
          this.apps = res.app;
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
        this.config = Object.assign(res[0]);
        this.initialAppList = res[0].applications || [];
        console.log(this.config);
      })
      .then(() => {
        let i = interval(200).subscribe(() => {
          i.unsubscribe();
          this.setConfig();
        });
      })
      .catch((err) => console.log(err));
  }

  getRestrictions() {
    this.configService
      .getRestrictions()
      .then((res) => {
        this.restrictions = res.split(', ');
      })
      .catch((err) => console.log(err));
  }

  editConfig() {
    const config = Object.assign(this.config, this.configForm.value);
    console.log(config);
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
  }

  editApp(id: string) {
    const currentApp = this.apps.find((app) => app.ID === id);
    if (currentApp) {
      this.editedApps.push(currentApp);
    }
  }

  toggleApp(app) {
    const { id, value } = app;
    if (value === '0') {
      this.config.removedApps.push(id);
    }
    if (value === '1') {
      this.config.installedApps.push(id);
    }
  }

  goBack() {
    this.router.navigateByUrl('config');
  }

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
    this.getRestrictions();
    this.config.applications = this.initialAppList;
  }

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
}
