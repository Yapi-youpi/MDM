import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { IGroup } from '../../../../shared/types/groups';
import { IConfig } from '../../../../shared/types/config';
import { Option } from '../../../../shared/types/input';
import { GroupSelectedClass } from '../../../../shared/classes/groups/group-selected.class';
import { GroupClass } from '../../../../shared/classes/groups/group.class';
import { edit } from '../../../../shared/services/forms/group';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss'],
})
export class GroupItemComponent {
  @Input() group!: IGroup;
  @Input() configs!: IConfig[];
  @Input() userRole!: string;

  @ViewChild('name') nameRef!: ElementRef;
  @ViewChild('tip') tipRef!: ElementRef;

  public currOption: Option = { value: '', html: '' };

  constructor(
    private selection: GroupSelectedClass,
    private groups: GroupClass,
    private form: edit
  ) {}

  displayTip() {
    if (
      this.nameRef.nativeElement.offsetWidth <
      this.nameRef.nativeElement.scrollWidth
    ) {
      this.tipRef.nativeElement.style.visibility = 'visible';
      this.tipRef.nativeElement.style.opacity = 1;
    }
  }
  hideTip() {
    this.tipRef.nativeElement.style.visibility = 'hidden';
    this.tipRef.nativeElement.style.opacity = 0;
  }

  get _options() {
    return this.configs.map((c) => {
      return {
        value: c.ID,
        html: c.name,
      } as Option;
    });
  }

  get _currOption() {
    return {
      value: this.group.deviceConfigID,
      html: this.configs.find((c) => c.ID === this.group.deviceConfigID)?.name,
    } as Option;
  }

  onSelectHandler(item: Option) {
    this.currOption = item;
  }

  onSelectUnselectGroupHandler(group: IGroup) {
    this.selection.selectUnselectSingleGroup(group);
  }

  onFileClickHandler(group: IGroup) {
    this.groups.setCurrent(group);
  }

  onEditCLickHandler(group: IGroup) {
    this.groups.setCurrent(group);
    this.form.form.patchValue(group);
  }

  onDeleteClickHandler(group: IGroup) {
    this.groups.setCurrent(group);
  }
}
