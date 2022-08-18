import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';

import {
  alertService,
  deviceConfigService,
  groupService,
  userService,
} from '../../../shared/services';
import { group } from 'src/app/shared/services/forms';
import { add, edit, editSeveral } from '../../../shared/services/forms/group';

import { DevicesGroup } from '../../../shared/types/groups';
import { DevicesConfig } from '../../../shared/types/config';
import * as states from '../../../shared/types/states';
import { GroupFilter } from '../../../shared/types/filters';
import { AssetService } from '../../../shared/services/asset.service';

@Component({
  selector: 'app-group',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit, OnDestroy {
  public title = 'Группы устройств';
  public groups: DevicesGroup[] = [];
  public configs: DevicesConfig[] = [];
  public loading: boolean = true;
  public userRole: string = '';
  public currGroup!: DevicesGroup;
  public isAllSelected: boolean = false;
  public selectedGroupsIDs: string[] = [];
  public searchParam: string = '';
  public isNamesSortAsc: boolean = true;
  public isDevicesCountSortAsc: boolean = true;
  public isConfigSortAsc: boolean = true;
  public configsNV: { name: string; value: string }[] = [];
  public isDateSortAsc: boolean = true;

  public filter: GroupFilter = {
    status: null,
    dateFrom: null,
    dateTo: null,
    configsIDs: null,
  };

  constructor(
    private groupService: groupService,
    private configService: deviceConfigService,
    private userService: userService,
    private filterForm: group.filter,
    private editForm: edit,
    private editSeveralForm: editSeveral,
    private addForm: add,
    private alert: alertService,
    private asset: AssetService
  ) {}

  ngOnInit() {
    const i = interval(200).subscribe(() => {
      this.getGroups('all');
      this.getConfigs('all');
      this.asset.getFromStorage('user-role').then((role: string) => {
        this.userRole = role;
      });
      i.unsubscribe();
    });
  }

  ngOnDestroy() {
    this.filterForm.reset();
  }

  getGroups(param: string) {
    this.loading = true;

    this.groupService
      .get(param)
      .then((res: states.DevicesGroupsState) => {
        if (res.success) {
          this.groups = res.devicesGroups ? res.devicesGroups : [];
        } else {
          this.alert.show({
            title: 'GET GROUPS ERROR',
            content: res.error,
          });
        }
      })
      .finally(() => {
        timer(500).subscribe(() => {
          this.loading = false;
        });
      });
  }

  getConfigs(param: string) {
    this.loading = true;

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
          this.loading = false;
        });
      });
  }

  onChangeSearchInputHandler(value: string) {
    this.searchParam = value;
  }

  resetSearchParams() {
    this.filter.status = null;
    this.filter.dateFrom = null;
    this.filter.dateTo = null;
    this.filter.configsIDs = null;
  }

  resetOneSearchParam(
    type: 'status' | 'dateFrom' | 'dateTo' | 'configsIDs',
    value?: string
  ) {
    switch (type) {
      case 'status': {
        this.filter.status = null;
        if (this.filterForm.form.controls['status-on'].value === true)
          this.filterForm.form.controls['status-on'].setValue(false);
        if (this.filterForm.form.controls['status-off'].value === true)
          this.filterForm.form.controls['status-off'].setValue(false);
        break;
      }
      case 'dateFrom': {
        this.filter.dateFrom = null;
        this.filterForm.form.controls['date-from'].setValue(null);
        break;
      }
      case 'dateTo': {
        this.filter.dateTo = null;
        this.filterForm.form.controls['date-to'].setValue(null);
        break;
      }
      case 'configsIDs': {
        if (value) {
          const prevValues: string[] =
            this.filterForm.form.controls['config_ids'].value;
          const newValues = prevValues.filter((c) => c !== value);
          this.filterForm.form.controls['config_ids'].setValue(newValues);
          this.filter.configsIDs = newValues;
        }
        break;
      }
      default:
        return;
    }
  }

  searchGroupsWithParams() {
    this.cancelSelection();

    this.filter.status = this.filterForm._status;
    this.filter.dateFrom = this.filterForm._dateFrom;
    this.filter.dateTo = this.filterForm._dateTo;
    this.filter.configsIDs = this.filterForm._configsIDs;
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
    this.isAllSelected = !this.isAllSelected;

    this.groups.map((g) => {
      g.isSelected = this.isAllSelected;
    });

    if (this.isAllSelected)
      this.selectedGroupsIDs = this.groups.map((g) => g.id);
    else this.selectedGroupsIDs = [];
  }

  selectUnselectGroup(group: DevicesGroup) {
    this.groups.map((g) => {
      if (g.id === group.id) {
        g.isSelected = !g.isSelected;

        if (g.isSelected && !this.selectedGroupsIDs.includes(g.id))
          this.selectedGroupsIDs.push(g.id);

        if (!g.isSelected && this.selectedGroupsIDs.includes(g.id))
          this.selectedGroupsIDs = this.selectedGroupsIDs.filter(
            (sg) => sg !== g.id
          );
      }
    });
    if (!group.isSelected && this.isAllSelected) {
      this.isAllSelected = !this.isAllSelected;
    }
    if (this.selectedGroupsIDs.length === this.groups.length)
      this.isAllSelected = true;
  }

  cancelSelection() {
    this.selectedGroupsIDs = [];

    if (this.isAllSelected) this.isAllSelected = false;

    this.groups.map((g) => {
      if (g.isSelected) g.isSelected = false;
    });
  }

  addGroup() {
    this.loading = true;

    this.groupService
      .add(this.addForm.form.getRawValue())
      .then((res: states.GroupsState) => {
        if (res.success) {
          if (res.group?.[0]) this.groups = [res.group[0], ...this.groups];

          const modal = document.querySelector('#add_group');
          if (!modal?.classList.contains('hidden'))
            modal?.classList.toggle('hidden');

          this.addForm.reset();
        } else {
          this.alert.show({
            title: 'ADD GROUP ERROR',
            content: res.error,
          });
        }
      })
      .finally(() => {
        timer(500).subscribe(() => {
          this.loading = false;
        });
      });
  }

  changeGroupState(group: DevicesGroup) {
    this.loading = true;

    this.groupService
      .changeState(group.id, !group.activeState)
      .then((res: states.State) => {
        if (res.success) {
          this.groups = this.groups.map((g) => {
            return g.id === group.id
              ? { ...g, activeState: !g.activeState }
              : g;
          });
        } else {
          this.alert.show({
            title: 'CHANGE GROUP STATE ERROR',
            content: res.error,
          });
        }
      })
      .finally(() => {
        timer(500).subscribe(() => {
          this.loading = false;
        });
      });
  }

  changeGroupConfig(group: DevicesGroup, deviceConfigID: string) {
    this.loading = true;

    this.groupService
      .edit({ ...group, deviceConfigID: deviceConfigID })
      .then((res: states.State) => {
        if (res.success) {
          this.groups = this.groups.map((g) => {
            return g.id === group.id
              ? { ...g, deviceConfigID: deviceConfigID }
              : g;
          });
        } else {
          this.alert.show({
            title: 'CHANGE GROUP CONFIG ERROR',
            content: res.error,
          });
        }
      })
      .finally(() => {
        timer(500).subscribe(() => {
          this.loading = false;
        });
      });
  }

  selectGroupToEdit(group: DevicesGroup) {
    this.currGroup = group;
    this.editForm.form.patchValue(group);
  }

  editGroup() {
    this.loading = true;

    this.groupService
      .edit({ ...this.currGroup, ...this.editForm.form.getRawValue() })
      .then((res: { success: boolean; error: string }) => {
        if (res.success) {
          this.groups = this.groups.map((g) => {
            return g.id === this.currGroup.id
              ? { ...g, ...this.editForm.form.getRawValue() }
              : g;
          });

          const modal = document.querySelector('#edit_group');
          if (!modal?.classList.contains('hidden'))
            modal?.classList.toggle('hidden');
        } else {
          this.alert.show({
            title: 'EDIT GROUP ERROR',
            content: res.error,
          });
        }
      })
      .finally(() => {
        timer(500).subscribe(() => {
          this.loading = false;
        });
      });
  }

  editSeveralGroups() {
    this.loading = true;

    const data: DevicesGroup[] = this.groups
      .filter((g) => this.selectedGroupsIDs.includes(g.id))
      .map((g) => {
        return {
          ...g,
          deviceConfigID: this.editSeveralForm._config,
          activeState: this.editSeveralForm._state,
        };
      });

    this.groupService
      .editSeveral(data)
      .then((res: states.State) => {
        if (res.success) {
          data.forEach((d) => {
            this.groups = this.groups.map((g) => {
              if (g.id === d.id) return d;
              else return g;
            });
          });

          this.selectedGroupsIDs = [];

          const modal = document.querySelector('#edit_several_groups');
          if (!modal?.classList.contains('hidden'))
            modal?.classList.toggle('hidden');
        } else {
          this.alert.show({
            title: 'EDIT SEVERAL ERROR',
            content: res.error,
          });
        }
      })
      .finally(() => {
        timer(500).subscribe(() => {
          this.loading = false;
        });
      });
  }

  selectGroupToDelete(group: DevicesGroup) {
    this.currGroup = group;
  }

  deleteGroup() {
    this.loading = true;

    this.groupService
      .delete(this.currGroup)
      .then((res: states.State) => {
        if (res.success) {
          this.groups = this.groups.filter((g) => {
            return g.id !== this.currGroup.id;
          });

          const modal = document.querySelector('#delete_group');
          if (!modal?.classList.contains('hidden'))
            modal?.classList.toggle('hidden');
        } else {
          this.alert.show({
            title: 'DELETE GROUP ERROR',
            content: res.error,
          });
        }
      })
      .finally(() => {
        timer(500).subscribe(() => {
          this.loading = false;
        });
      });
  }

  deleteSeveralGroups() {
    this.loading = true;

    const data: DevicesGroup[] = this.groups
      .filter((g) => this.selectedGroupsIDs.includes(g.id))
      .map((g) => {
        return {
          ...g,
          deviceConfigID: this.editSeveralForm._config,
          activeState: this.editSeveralForm._state,
        };
      });

    this.groupService
      .deleteSeveral(data)
      .then((res: states.State) => {
        if (res.success) {
          data.forEach((d) => {
            this.groups = this.groups.filter((g) => g.id !== d.id);
          });

          this.selectedGroupsIDs = [];

          const modal = document.querySelector('#delete_several_elements');
          if (!modal?.classList.contains('hidden'))
            modal?.classList.toggle('hidden');
        } else {
          this.alert.show({
            title: 'EDIT SEVERAL ERROR',
            content: res.error,
          });
        }
      })
      .finally(() => {
        timer(500).subscribe(() => {
          this.loading = false;
        });
      });
  }
}
