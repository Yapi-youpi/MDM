import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../../shared/services/asset.service';
import { IConfig } from '../../../shared/types/config';
import { ConfigClass } from '../../../shared/classes/configs/config.class';

@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.css'],
})
export class ConfigsComponent implements OnInit {
  public title = 'Конфигурации';

  public search = '';

  constructor(public asset: AssetService, private config: ConfigClass) {}

  get _configs() {
    return this.config.array;
  }

  get _default() {
    return this.config.default;
  }

  ngOnInit() {
    this.config.get('default').then();
    this.config.get('all').then();
  }

  setCurrentConfig(config: IConfig) {
    this.config.setCurrent(config);
  }

  setConfigName(configName) {
    this.asset.configName = configName;
  }
}
