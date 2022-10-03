import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../../shared/services/asset.service';
import { IConfig } from '../../../shared/types/config';
import { ConfigClass } from '../../../shared/classes/configs/config.class';
import { MyUserClass } from '../../../shared/classes/users/my-user.class';
import { interval } from 'rxjs';

@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.css'],
})
export class ConfigsComponent implements OnInit {
  public title = 'Конфигурации';

  public search = '';

  constructor(
    public asset: AssetService,
    private config: ConfigClass,
    private myUser: MyUserClass
  ) {}

  get _configs() {
    return this.config.array;
  }

  get _default() {
    return this.config.default;
  }

  ngOnInit() {
    const i = interval(1000).subscribe(() => {
      if (this.myUser.token) {
        this.config.get('default').then();
        this.config.get('all').then();
        i.unsubscribe();
      }
    });
  }

  setCurrentConfig(config: IConfig) {
    this.config.setCurrent(config);
  }

  setConfigName(configName) {
    this.asset.configName = configName;
  }
}
