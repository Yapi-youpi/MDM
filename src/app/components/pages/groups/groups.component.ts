import { Component, OnInit } from "@angular/core";
import { interval } from "rxjs";

import {
  deviceConfigService,
  groupService,
  userService,
} from "../../../shared/services";
import { group } from "src/app/shared/services/forms";
import { edit, editSeveral } from "../../../shared/services/forms/group";

import { DevicesGroup } from "../../../shared/types/groups";
import { DevicesConfig } from "../../../shared/types/config";
import * as states from "../../../shared/types/states";
import { GroupFilter } from "../../../shared/types/filters";

@Component({
  selector: "app-group",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.scss"],
})
export class GroupsComponent implements OnInit {
  public groups: DevicesGroup[] = [];
  public configs: DevicesConfig[] = [];
  public loading: boolean = true;

  public currGroup!: DevicesGroup;

  public isAllSelected: boolean = false;
  public selectedGroupsIDs: string[] = [];

  public searchParam: string = "";

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
    private editSeveralForm: editSeveral
  ) {}

  ngOnInit() {
    let i = interval(1000).subscribe(() => {
      if (this.userService.token) {
        i.unsubscribe();
        this.getGroups("all");
        this.getConfigs("all");
      }
    });
  }

  getGroups(param: string) {
    this.loading = true;

    this.groupService
      .get(param)
      .then((res: states.DevicesGroupsState) => {
        console.log(res);
        this.groups = res.devicesGroups;
      })
      .catch((err) => {
        console.log(err);
      });

    this.loading = false;
  }

  getConfigs(param: string) {
    this.loading = true;

    this.configService
      .get(param)
      .then((res: states.DevicesConfigsState) => {
        console.log(res);
        this.configs = res.devicesConfigs;
      })
      .catch((err) => {
        console.log(err);
      });

    this.loading = false;
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

  searchGroupsWithParams() {
    this.cancelSelection();

    this.filter.status = this.filterForm._status;
    this.filter.dateFrom = this.filterForm._dateFrom;
    this.filter.dateTo = this.filterForm._dateTo;
    this.filter.configsIDs = this.filterForm._configsIDs;
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

  changeGroupState(group: DevicesGroup) {
    this.loading = true;

    this.groupService
      .changeState(group.id, !group.activeState)
      .then((res: states.State) => {
        if (res.success) {
          console.log(`Группа ${group.name} изменена`);

          this.groups = this.groups.map((g) => {
            return g.id === group.id
              ? { ...g, activeState: !g.activeState }
              : g;
          });
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    this.loading = false;
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
          console.log(`Группа ${this.currGroup.name} изменена`);

          this.groups = this.groups.map((g) => {
            return g.id === this.currGroup.id
              ? { ...g, ...this.editForm.form.getRawValue() }
              : g;
          });

          const modal = document.querySelector("#edit_group");
          modal?.classList.toggle("hidden");
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    this.loading = false;
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

    // CODE

    console.log(data);

    this.loading = false;
  }

  selectGroupToDelete(group: DevicesGroup) {
    this.currGroup = group;
  }

  deleteGroup() {
    this.loading = true;

    this.groupService
      .delete(this.currGroup.id)
      .then((res: states.State) => {
        if (res.success) {
          console.log(`Группа ${this.currGroup.name} удалена`);

          this.groups = this.groups.filter((g) => {
            return g.id !== this.currGroup.id;
          });

          const modal = document.querySelector("#delete_group");
          modal?.classList.toggle("hidden");
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    this.loading = false;
  }

  deleteSeveralGroups() {
    this.loading = true;

    // CODE

    this.loading = false;
  }
}
