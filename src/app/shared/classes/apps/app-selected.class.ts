import { Injectable } from '@angular/core';
import { AppClass } from './app.class';
import { IApp } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class AppSelectedClass {
  public selectedIDs: string[] = [];

  constructor(private apps: AppClass) {}

  setListOfSelected(apps: string[]) {
    this.selectedIDs = apps;
  }

  findSiblingIDX(list: string[], group: IApp) {
    let idx = -1;
    group.children.forEach((c) => {
      if (list.includes(c.ID)) idx = list.indexOf(c.ID);
    });
    return idx;
  }

  checkAppsInConfig(list: string[], newID: string) {
    list.forEach((id) => {
      if (id === newID && this.selectedIDs.includes(newID))
        this.selectedIDs = this.selectedIDs.filter((el) => el !== newID);
    });
  }

  setElementSelection(
    group: IApp,
    isHead: boolean = true,
    checked: boolean = false,
    value: string = ''
  ) {
    if (isHead) {
      this.apps.groupedArray.map((g) => {
        if (g.ID === group.ID) {
          if (!this.selectedIDs.includes(g.ID)) this.selectedIDs.push(g.ID);
          else this.selectedIDs = this.selectedIDs.filter((sg) => sg !== g.ID);
        }
      });
    } else {
      const parentIDX = this.selectedIDs.indexOf(group.ID);
      const siblingIDX = this.findSiblingIDX(this.selectedIDs, group);

      if (checked) {
        if (parentIDX >= 0 && siblingIDX < 0)
          this.selectedIDs.splice(parentIDX, 1, value);
        else {
          this.selectedIDs.splice(siblingIDX, 1, value);
        }
      } else {
        if (parentIDX >= 0 && siblingIDX < 0)
          this.selectedIDs = this.selectedIDs.filter((s) => s !== group.ID);
        else this.selectedIDs = this.selectedIDs.filter((s) => s !== value);
      }
    }
  }

  checkIfExistsInList(group: IApp) {
    let flag = false;
    if (this.selectedIDs.includes(group.ID)) flag = true;
    else {
      group.children.forEach((c) => {
        if (this.selectedIDs.includes(c.ID)) flag = true;
      });
    }
    return flag;
  }

  swapIDs(group: IApp, newID: string) {
    const parentIDX = this.selectedIDs.indexOf(group.ID);
    const siblingIDX = this.findSiblingIDX(this.selectedIDs, group);

    if (parentIDX >= 0) this.selectedIDs.splice(parentIDX, 1, newID);
    if (siblingIDX >= 0) this.selectedIDs.splice(siblingIDX, 1, newID);
  }
}
