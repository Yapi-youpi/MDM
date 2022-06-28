import { Component, ElementRef, OnInit } from "@angular/core";
import { GroupsService } from "../../../services/groups.service";
import { UserService } from "../../../services/user.service";
import { interval } from "rxjs";
import { Groups } from "../../../interfaces/interfaces";
import M from "materialize-css";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.css"],
})
export class GroupsComponent implements OnInit {
  public groups: Groups[] = [];
  public loading = true;
  public id = "";
  public name = "";
  public rename = "";
  constructor(
    private groupService: GroupsService,
    private userService: UserService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    let elem = this.elementRef.nativeElement.querySelectorAll(".modal");
    M.Modal.init(elem);
    let i = interval(1000).subscribe(() => {
      if (this.userService.token) {
        i.unsubscribe();
        this.getGroups("all");
      }
    });
  }

  getGroups(param: string) {
    this.groupService
      .getGroups(param)
      .then((res) => {
        console.log(res);
        this.groups = res;
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addGroup(name: string) {
    this.groupService
      .addGroups(name)
      .then((res) => {
        console.log(res);
        this.name = "";
        this.getGroups("all");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeState(state: boolean, id: string) {
    this.groupService
      .changeState(state, id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removeGroup(id: string) {
    this.groupService
      .removeGroup(id)
      .then((res) => {
        console.log(res);
        this.getGroups("all");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renameGroup(id: string, name: string) {
    this.groupService.renameGroup(id, name).then((res) => {
      console.log(res);
      this.rename = "";
      this.getGroups("all");
    });
  }

  getID(id: string) {
    this.id = id;
  }

  removeGroupWithDevices(id: string) {
    this.groupService
      .removeGroupWithDevices(id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
