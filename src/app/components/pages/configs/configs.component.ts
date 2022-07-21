import { Component, OnInit } from '@angular/core';
import { DevicesConfigService } from '../../../services/devices-config.service';
import { interval } from 'rxjs';
import { DevicesConfig } from '../../../interfaces/interfaces';
import { AssetService } from '../../../services/asset.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../../shared/services/user.service";

@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.css'],
})
export class ConfigsComponent implements OnInit {
  public newConfigForm: FormGroup;
  public search = '';
  public default_config!: DevicesConfig;
  public configs: DevicesConfig[] = [];
  public loading = true;
  public rename = '';
  public currentConfig!: DevicesConfig;
  constructor(
    public asset: AssetService,
    private configService: DevicesConfigService,
    private userService: UserService
  ) {
    this.newConfigForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      prototype: new FormControl(''),
    });
    this.newConfigForm.controls['prototype'].setValue(
      'Стандартная конфигурация',
      { onlySelf: true }
    );
  }

  ngOnInit(): void {
    let i = interval(1000).subscribe(() => {
      if (this.userService.token) {
        i.unsubscribe();
        this.getDefaultConfig();
        this.getAllConfigs();
      }
    });
  }

  getDefaultConfig() {
    this.configService
      .getConfig('default')
      .then((res) => {
        this.default_config = Object.assign(res[0]);
        console.log(this.default_config);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAllConfigs() {
    this.configService
      .getConfig('all')
      .then((res) => {
        console.log(res);
        this.loading = false;
        this.configs = res;
        this.sortConfigs();
      })
      .catch((err) => {
        console.log(err.error.error);
      });
  }

  addConfig(value: any) {
    const name = value.name;
    const description = value.description;
    const config = value.prototype;
    const prototype =
      config === 'Стандартная конфигурация'
        ? this.default_config
        : this.configs.find((conf) => conf.name === config);
    this.configService
      .addConfig(prototype, name, description)
      .then((res) => {
        console.log(res);
        this.getAllConfigs();
        // this.name = '';
      })
      .catch((err) => {
        console.log(err.error.error);
        this.getAllConfigs();
      });
  }

  removeConfig(id: string) {
    this.configService
      .removeConfig(id)
      .then((res) => {
        console.log(res);
        this.getAllConfigs();
      })
      .catch((err) => {
        console.log(err.error.error);
      });
  }

  renameConfig(id: string, name: string) {
    this.configService
      .renameConfig(id, name)
      .then(() => {
        this.getAllConfigs();
        this.rename = '';
      })
      .catch((err) => {
        console.log(err.error.error);
      });
  }

  setCurrentConfig(config) {
    this.currentConfig = config;
  }

  sortConfigs() {
    this.configs.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
    let i = interval(1000).subscribe(() => {
      this.asset.modalInit('modal-add-config');
      this.asset.modalInit('modal-delete-config');
      i.unsubscribe();
    });
  }
}
