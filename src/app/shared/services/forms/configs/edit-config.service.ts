import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IConfig } from '../../../types/config';

@Injectable({
  providedIn: 'root',
})
export class EditConfigService {
  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({
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

  get values() {
    return this.form.getRawValue();
  }

  updateWithConfig(values: IConfig) {
    this.form.patchValue(values);
  }
}
