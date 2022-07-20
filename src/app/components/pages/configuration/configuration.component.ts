import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DevicesConfigService } from '../../../services/devices-config.service';
import { DevicesConfig } from '../../../interfaces/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
})
export class ConfigurationComponent implements OnInit {
  public config!: DevicesConfig;
  public configForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private configService: DevicesConfigService,
    public userService: UserService,
    private router: Router
  ) {
    this.configForm = new FormGroup({
      GPS: new FormControl(true, Validators.required),
      autoUpdate: new FormControl(false, Validators.required),
      backgroundColor: new FormControl('', Validators.required),
      backgroundImageUrl: new FormControl('', Validators.required),
      blockStatusBar: new FormControl(false, Validators.required),
      bluetooth: new FormControl(true, Validators.required),
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
      lockVolume: new FormControl(false, Validators.required),
      manageTimeout: new FormControl(false, Validators.required),
      manageVolume: new FormControl(false, Validators.required),
      mobileData: new FormControl(true, Validators.required),
      mobileEnrollment: new FormControl(false, Validators.required),
      name: new FormControl('', Validators.required),
      orientation: new FormControl(0, Validators.required),
      pushOptions: new FormControl('all', Validators.required),
      restrictions: new FormControl('', Validators.required),
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

  getConfig() {
    const id = this.route.snapshot.paramMap.get('id') || 'default';
    console.log(id);
    this.configService
      .getConfig(id)
      .then((res) => {
        this.config = Object.assign(res[0]);
        console.log(this.config);
      })
      .then(() => {
        let i = interval(200).subscribe(() => {
          i.unsubscribe();
          this.configForm.patchValue(this.config);
        });
      })
      .catch((err) => console.log(err));
  }

  goBack() {
    this.router.navigateByUrl('config');
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
      console.log(tabsContent[i]);
      // @ts-ignore
      tabsContent[i].style.display = 'flex';
      tabs[i].classList.add('tab--active');
    }
  }
}
