import { Component, OnInit } from '@angular/core';
import { ConfigsService } from '../../../shared/services/configs.service';
import { DevicesConfig } from '../../../interfaces/interfaces';
import { AssetService } from '../../../shared/services/asset.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.css'],
})
export class ConfigsComponent implements OnInit {
  public title = 'Конфигурации';
  public newConfigForm: FormGroup;
  public search = '';
  public default_config!: DevicesConfig;
  public configs: DevicesConfig[] = [];
  public loading = true;
  public currentConfig!: DevicesConfig;
  constructor(
    public asset: AssetService,
    private configService: ConfigsService
  ) {
    this.newConfigForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      prototype: new FormControl(''),
    });
    this.newConfigForm.controls['prototype'].setValue(
      'Стандартная конфигурация',
      {
        onlySelf: true,
      }
    );
  }

  ngOnInit(): void {
    this.getDefaultConfig();
    this.getAllConfigs();
  }

  getDefaultConfig() {
    this.configService
      .getConfig('default')
      .then((res) => {
        this.default_config = Object.assign(res[0]);
        // console.log(this.default_config);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAllConfigs() {
    this.configService
      .getConfig('all')
      .then((res) => {
        // console.log('CONFIGS: ', res);
        this.loading = false;
        this.configs = res;
        this.sortConfigs();
      })
      .catch((err) => {
        console.log(err.error.error);
      });
  }

  setCurrentConfig(config) {
    this.currentConfig = config;
  }

  setConfigName(configName) {
    this.asset.configName = configName;
  }

  sortConfigs() {
    this.configs.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
  }
}
