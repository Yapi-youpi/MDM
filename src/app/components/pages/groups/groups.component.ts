import { Component, OnInit } from "@angular/core";
import { interval } from "rxjs";

import {
  deviceConfigService,
  groupService,
  userService,
} from "../../../shared/services";

import { DevicesGroup } from "../../../shared/types/groups";
import { DevicesConfig } from "../../../shared/types/config";

import {
  DevicesConfigsState,
  DevicesGroupsState,
} from "../../../shared/types/states";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.scss"],
})
export class GroupsComponent implements OnInit {
  public groups: DevicesGroup[] = [];
  public configs: DevicesConfig[] = [];
  public loading: boolean = true;

  public searchParam: string = "";

  constructor(
    private groupService: groupService,
    private configService: deviceConfigService,
    private userService: userService
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
      .then((res: DevicesGroupsState) => {
        console.log(res);
        this.groups = res.devicesGroups;
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getConfigs(param: string) {
    this.loading = true;

    this.configService
      .get(param)
      .then((res: DevicesConfigsState) => {
        console.log(res);
        this.configs = res.devicesConfigs;
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChangeSearchInputHandler(value: string) {
    this.searchParam = value;
  }
}
