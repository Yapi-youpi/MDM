import { Injectable } from '@angular/core';
import { GroupClass } from './group.class';
import { IGroup } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class GroupSelectedClass {
  public isAllSelected: boolean = false;
  public selectedIDs: string[] = [];

  constructor(private group: GroupClass) {}

  setElementSelection(group: IGroup) {
    this.group.array.map((d) => {
      if (d.id === group.id) {
        d.isSelected = !d.isSelected;

        if (d.isSelected && !this.selectedIDs.includes(d.id))
          this.selectedIDs.push(d.id);

        if (!d.isSelected && this.selectedIDs.includes(d.id))
          this.selectedIDs = this.selectedIDs.filter((sg) => sg !== d.id);
      }
    });
  }

  setListOfSelected(groups: IGroup[]) {
    this.selectedIDs = groups.map((d) => d.id);
  }

  selectUnselectSingleGroup(group: IGroup) {
    this.setElementSelection(group);

    if (!group.isSelected && this.isAllSelected) {
      this.isAllSelected = !this.isAllSelected;
    }

    if (this.selectedIDs.length === this.group.array.length)
      this.isAllSelected = true;
  }

  selectUnselectGroups() {
    this.isAllSelected = !this.isAllSelected;

    this.setSelectionTotal(this.isAllSelected);

    if (this.isAllSelected) this.setListOfSelected(this.group.array);
    else this.setListOfSelected([]);
  }

  cancelSelection() {
    this.setListOfSelected([]);

    if (this.isAllSelected) this.isAllSelected = false;

    this.setSelectionTotal(false);
  }

  setSelectionTotal(value: boolean) {
    this.group.array.map((d) => {
      d.isSelected = value;
    });
  }
}
