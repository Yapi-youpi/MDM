import { Component } from '@angular/core';
import { interval, timer } from 'rxjs';

import { userService } from '../../../shared/services';
import { AppClass, LoaderClass } from '../../../shared/classes';
import { AssetService } from '../../../shared/services/asset.service';
import { MyUserClass } from '../../../shared/classes/users/my-user.class';

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
    private loader: LoaderClass,
    private apps: AppClass,
    private myUser: MyUserClass
  ) {}

  get loading$() {
    return this.loader.loading$;
  }

  get entity$() {
    return this.loader.entity$;
  }

  get _apps() {
    return this.apps.groupedArray;
  }

  ngOnInit() {
    const i = interval(1000).subscribe(() => {
      if (this.myUser.token) {
        this.apps.get('all').then();
        i.unsubscribe();
      }
    });
  }

  onChangeSearchInputHandler(value: string) {
    this.searchParam = value;
  }

  toggleSystemApps() {
    this.loader.start('apps');

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
