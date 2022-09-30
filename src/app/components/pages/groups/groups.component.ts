import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';

import {
  alertService,
  deviceConfigService,
  userService,
} from '../../../shared/services';
import { group } from 'src/app/shared/services/forms';
import { add, edit, editSeveral } from '../../../shared/services/forms/group';
import { IConfig } from '../../../shared/types/config';
import { AssetService } from '../../../shared/services/asset.service';
import { IFile } from '../../../shared/types/files';
import { GroupClass } from '../../../shared/classes/groups/group.class';
import { GroupFiltersClass } from '../../../shared/classes/groups/group-filters.class';
import { GroupLoaderClass } from '../../../shared/classes/groups/group-loader.class';
import { GroupSelectedClass } from '../../../shared/classes/groups/group-selected.class';

@Component({
  selector: 'app-group',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  providers: [GroupFiltersClass],
})
export class GroupsComponent implements OnInit {
  public title = 'Группы устройств';

  // public loading: boolean = true;

  public configs: IConfig[] = [];
  public userRole: string = '';
  public currFile: IFile | null = null;
  public isAllSelected: boolean = false;

  public searchParam: string = '';

  public isNamesSortAsc: boolean = true;
  public isDevicesCountSortAsc: boolean = true;
  public isConfigSortAsc: boolean = true;
  public configsNV: { name: string; value: string }[] = [];
  public isDateSortAsc: boolean = true;

  constructor(
    private group: GroupClass,
    private selection: GroupSelectedClass,
    private gLoader: GroupLoaderClass,
    private configService: deviceConfigService,
    private userService: userService,
    private filterForm: group.filter,
    private editForm: edit,
    private editSeveralForm: editSeveral,
    private addForm: add,
    private alert: alertService,
    private asset: AssetService,
    public filters: GroupFiltersClass
  ) {}

  get _gLoading() {
    return this.gLoader.loading;
  }

  get _groups() {
    return this.group.array;
  }

  ngOnInit() {
    const i = interval(200).subscribe(() => {
      this.getGroups();
      this.getConfigs('all');
      this.asset.getFromStorage('user-role').then((role: string) => {
        this.userRole = role;
      });
      i.unsubscribe();
    });
  }

  getGroups() {
    this.group.get('all').then();
  }

  getConfigs(param: string) {
    // this.loading = true;

    this.configService
      .getConfig(param)
      .then((res) => {
        this.configs = res;
        this.configs.forEach((c) => {
          this.configsNV.push({ name: c.name, value: c.ID });
        });
      })
      .catch((err) => {
        this.alert.show({
          title: 'GET CONFIGS ERROR',
          content: err.error,
        });
      })
      .finally(() => {
        timer(500).subscribe(() => {
          // this.loading = false;
        });
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
