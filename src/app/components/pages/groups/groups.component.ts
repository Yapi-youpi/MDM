import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';

import {
  alertService,
  deviceConfigService,
  userService,
} from '../../../shared/services';
import { group } from 'src/app/shared/services/forms';
import { add, edit, editSeveral } from '../../../shared/services/forms/group';

import { IGroup } from '../../../shared/types/groups';
import { IConfig } from '../../../shared/types/config';
import { AssetService } from '../../../shared/services/asset.service';
import { addFile } from '../../../shared/services/forms/device';
import { groupsFiles } from '../../../shared/services/files';
import { IFile } from '../../../shared/types/files';
import { GroupClass } from '../../../shared/classes/groups/group.class';
import { GroupFiltersClass } from '../../../shared/classes/groups/group-filters.class';

@Component({
  selector: 'app-group',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  providers: [GroupFiltersClass],
})
export class GroupsComponent implements OnInit, OnDestroy {
  public title = 'Группы устройств';

  public loading: boolean = true;

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
    private groups: GroupClass,
    private configService: deviceConfigService,
    private userService: userService,
    private filterForm: group.filter,
    private editForm: edit,
    private editSeveralForm: editSeveral,
    private addForm: add,
    private alert: alertService,
    private asset: AssetService,
    private files: groupsFiles,
    private fileForm: addFile,
    public filters: GroupFiltersClass
  ) {}

  get _groups() {
    return this.groups.array;
  }

  get _selectedDevices() {
    return this.groups.selectedIDs;
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

  ngOnDestroy() {
    this.filterForm.reset();
  }

  getGroups() {
    this.groups.get('all');
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
    this.filters.resetAll();
  }

  resetOneSearchParam(
    type: 'status' | 'dateFrom' | 'dateTo' | 'configsIDs',
    value?: string
  ) {
    this.filters.resetOneParam(type, value);
  }

  searchGroupsWithParams() {
    this.cancelSelection();

    this.filters.setParams();
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

    this.groups.setSelectionTotal(this.isAllSelected);

    if (this.isAllSelected) this.groups.setListOfSelected(this.groups.array);
    else this.groups.setListOfSelected([]);
  }

  selectUnselectGroup(group: IGroup) {
    this.groups.setElementSelection(group);

    if (!group.isSelected && this.isAllSelected) {
      this.isAllSelected = !this.isAllSelected;
    }

    if (this.groups.selectedIDs.length === this.groups.array.length)
      this.isAllSelected = true;
  }

  cancelSelection() {
    this.groups.setListOfSelected([]);

    if (this.isAllSelected) this.isAllSelected = false;

    this.groups.setSelectionTotal(false);
  }

  setCurrentGroup(group: IGroup, isToEdit: boolean = false) {
    this.groups.setCurrent(group);
    if (isToEdit) this.editForm.form.patchValue(group);
  }

  addGroup() {
    this.groups.add(this.addForm.values).then((res) => {
      if (res) {
        const modal = document.querySelector('#add_group');
        if (!modal?.classList.contains('hidden'))
          modal?.classList.toggle('hidden');
      }
    });
  }

  addFile() {
    const group = this.groups.current.value;

    if (group) {
      this.loading = true;

      this.files
        .upload(group.id, this.fileForm._file)
        .then((res) => {
          if (res.success) {
            if (group.files) {
              if (group.files?.length !== 0) {
                group.files = [res.file, ...group.files];
              } else {
                group.files.push(res.file);
              }
            } else {
              group.files = [res.file];
            }

            this.fileForm.resetForm();

            const modal = document.querySelector('#file_add');
            if (!modal?.classList.contains('hidden'))
              modal?.classList.toggle('hidden');
          } else {
            this.alert.show({
              title: 'ADD FILE ERROR',
              content: res.error,
            });
          }
        })
        .finally(() => {
          const t = timer(500).subscribe(() => {
            t.unsubscribe();
            this.loading = false;
          });
        });
    }
  }

  selectFileToDelete(file: IFile) {
    this.currFile = file;
  }

  deleteFile(file: IFile) {
    const group = this.groups.current.value;

    if (group) {
      this.loading = true;

      this.files
        .delete(group.id, file.fileID)
        .then((res) => {
          if (res.success) {
            if (group.files)
              group.files = group.files?.filter(
                (f) => f.fileID !== file.fileID
              );
            this.currFile = null;

            const modal = document.querySelector('#file_delete');
            if (!modal?.classList.contains('hidden'))
              modal?.classList.toggle('hidden');
          } else {
            console.log(res.error);
          }
        })
        .finally(() => {
          const t = timer(500).subscribe(() => {
            t.unsubscribe();
            this.loading = false;
          });
        });
    }
  }

  editGroup() {
    this.groups
      .edit([{ ...this.groups.current.value, ...this.editForm.values }])
      .then((res) => {
        if (res) {
          this.groups.updateGroups(this.editForm.values);

          const modal = document.querySelector('#edit_group');
          if (!modal?.classList.contains('hidden'))
            modal?.classList.toggle('hidden');
        }
      });
  }

  editSeveralGroups() {
    const data: IGroup[] = this.groups.array
      .filter((g) => this.groups.selectedIDs.includes(g.id))
      .map((g) => {
        return {
          ...g,
          deviceConfigID: this.editSeveralForm._config,
          activeState: this.editSeveralForm._state,
        };
      });

    this.groups.edit(data).then((res) => {
      if (res) {
        this.groups.updateGroups(undefined, true, data);
        const modal = document.querySelector('#edit_several_groups');
        if (!modal?.classList.contains('hidden'))
          modal?.classList.toggle('hidden');
      }
    });
  }

  deleteGroup() {
    if (this.groups.current.value) {
      this.groups.delete([this.groups.current.value], true).then((res) => {
        if (res) {
          const modal = document.querySelector('#delete_group');
          if (!modal?.classList.contains('hidden'))
            modal?.classList.toggle('hidden');
        }
      });
    }
  }

  deleteSeveralGroups() {
    const data: IGroup[] = this.groups.array
      .filter((g) => this.groups.selectedIDs.includes(g.id))
      .map((g) => {
        return {
          ...g,
          deviceConfigID: this.editSeveralForm._config,
          activeState: this.editSeveralForm._state,
        };
      });

    this.groups.delete(data).then((res) => {
      if (res) {
        const modal = document.querySelector('#delete_several_elements');
        if (!modal?.classList.contains('hidden'))
          modal?.classList.toggle('hidden');
      }
    });
  }
}
