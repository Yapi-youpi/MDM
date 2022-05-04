import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../services/groups.service';
import { UserService } from '../services/user.service';
import { interval } from 'rxjs';
import { Groups } from '../interfaces/interfaces';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
  public groups: Groups[] = [];
  public loading: boolean = true;
  constructor(
    private groupService: GroupsService,
    private userService: UserService
  ) {}

  ngOnInit() {
    let i = interval(1000).subscribe(() => {
      if (this.userService.token) {
        i.unsubscribe();
        this.groupService
          .getGroups('all')
          .then((res) => {
            console.log(res);
            this.groups = res;
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
  addGroup(name: string) {
    this.groupService
      .addGroups(name)
      .then((res) => {
        console.log(res);
        this.groupService.getGroups('all').then((res) => {
          this.groups = res;
        });
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
}
