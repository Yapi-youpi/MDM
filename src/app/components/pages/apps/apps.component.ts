import { Component } from '@angular/core';
import { timer } from 'rxjs';

import { userService } from '../../../shared/services';
import { AppLoaderClass } from '../../../shared/classes/apps/app-loader.class';
import { AppClass } from '../../../shared/classes/apps/app.class';
import { AssetService } from '../../../shared/services/asset.service';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss'],
})
export class AppsComponent {
  public title = 'Приложения';

  public searchParam: string = '';

  public isSystemApps: boolean = false;
  public isNameSortAsc: boolean = true;
  public isSizeSortAsc: boolean = true;

  constructor(
    private user: userService,
    private asset: AssetService,
    private loader: AppLoaderClass,
    private apps: AppClass
  ) {}

  get _loading() {
    return this.loader.loading;
  }

  get _apps() {
    return this.apps.groupedArray;
  }

  ngOnInit() {
    this.apps.get('all').then();
  }

  onChangeSearchInputHandler(value: string) {
    this.searchParam = value;
  }

  toggleSystemApps() {
    this.loader.start();

    const t = timer(500).subscribe(() => {
      t.unsubscribe();
      this.isSystemApps = !this.isSystemApps;
      this.loader.end();
    });
  }

  toggleNameSortDir() {
    this.isNameSortAsc = !this.isNameSortAsc;
  }

  toggleSizeSortDir() {
    this.isSizeSortAsc = !this.isSizeSortAsc;
  }
}
