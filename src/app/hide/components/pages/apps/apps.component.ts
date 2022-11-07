import { Component } from '@angular/core';
import { interval, timer } from 'rxjs';

import { userService } from '../../../shared/services';
import { AppClass, LoaderClass, MyUserClass } from '../../../shared/classes';
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
    private _user: userService,
    private _asset: AssetService,
    private _loader: LoaderClass,
    private _apps: AppClass,
    private _myUser: MyUserClass
  ) {}

  get loading$() {
    return this._loader.loading$;
  }

  get entity$() {
    return this._loader.entity$;
  }

  get apps() {
    return this._apps.groupedApps;
  }

  ngOnInit() {
    const i = interval(1000).subscribe(() => {
      if (this._myUser.token) {
        this._apps.get('all').then();
        i.unsubscribe();
      }
    });
  }

  onChangeSearchInputHandler(value: string) {
    this.searchParam = value;
  }

  toggleSystemApps() {
    this._loader.start('apps');

    const t = timer(500).subscribe(() => {
      t.unsubscribe();
      this.isSystemApps = !this.isSystemApps;
      this._loader.end();
    });
  }

  toggleNameSortDir() {
    this.isNameSortAsc = !this.isNameSortAsc;
  }

  toggleSizeSortDir() {
    this.isSizeSortAsc = !this.isSizeSortAsc;
  }
}
