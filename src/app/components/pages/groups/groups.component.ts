import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

import { userService } from '../../../shared/services';
import { AssetService } from '../../../shared/services/asset.service';
import { IFile } from '../../../shared/types/files';
import { GroupClass } from '../../../shared/classes/groups/group.class';
import { GroupFiltersClass } from '../../../shared/classes/groups/group-filters.class';
import { GroupLoaderClass } from '../../../shared/classes/groups/group-loader.class';
import { GroupSelectedClass } from '../../../shared/classes/groups/group-selected.class';
import { ConfigClass } from '../../../shared/classes/configs/config.class';
import { ConfigLoaderClass } from '../../../shared/classes/configs/config-loader.class';
import { MyUserClass } from '../../../shared/classes/users/my-user.class';

@Component({
  selector: 'app-group',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  providers: [GroupFiltersClass],
})
export class GroupsComponent implements OnInit {
  public title = 'Группы устройств';

  public userRole: string = '';
  public currFile: IFile | null = null;
  public isAllSelected: boolean = false;

  public configsNV: { name: string; value: string }[] = [];

  public searchParam: string = '';

  public isNamesSortAsc: boolean = true;
  public isDevicesCountSortAsc: boolean = true;
  public isConfigSortAsc: boolean = true;
  public isDateSortAsc: boolean = true;

  constructor(
    private group: GroupClass,
    private selection: GroupSelectedClass,
    private gLoader: GroupLoaderClass,
    private config: ConfigClass,
    private cLoader: ConfigLoaderClass,
    private userService: userService,
    private asset: AssetService,
    public filters: GroupFiltersClass,
    private myUser: MyUserClass
  ) {}

  get _gLoading() {
    return this.gLoader.loading;
  }

  get _cLoading() {
    return this.cLoader.loading;
  }

  get _groups() {
    return this.group.array;
  }

  ngOnInit() {
    const i = interval(1000).subscribe(() => {
      if (this.myUser.token) {
        this.group.get('all').then();
        this.getConfigs();
        this.asset.getFromStorage('user-role').then((role: string) => {
          this.userRole = role;
        });
        i.unsubscribe();
      }
    });
  }

  getConfigs() {
    this.config.get('all').then((res) => {
      if (res) {
        this.config.array.forEach((c) =>
          this.configsNV.push({ name: c.name, value: c.ID })
        );
      }
    });
  }

  onChangeSearchInputHandler(value: string) {
    this.searchParam = value;
  }

  changeSortNameDir() {
    this.isNamesSortAsc = !this.isNamesSortAsc;
  }
  changeSortDevicesCountDir() {
    this.isDevicesCountSortAsc = !this.isDevicesCountSortAsc;
  }
  changeSortConfigDir() {
    this.isConfigSortAsc = !this.isConfigSortAsc;
  }
  changeSortDateDir() {
    this.isDateSortAsc = !this.isDateSortAsc;
  }

  selectUnselectGroups() {
    this.selection.selectUnselectGroups();
  }
}
