import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IGroup } from '../../../../../shared/types/groups';
import { GroupClass } from '../../../../../shared/classes/groups/group.class';

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.scss'],
})
export class DeleteGroupComponent {
  @Input() isDataFetching: boolean = false;

  @Output() onSubmit = new EventEmitter<IGroup>();

  constructor(private groups: GroupClass) {}

  get _group() {
    return this.groups.current.value;
  }

  onSubmitHandler() {
    if (this._group) this.onSubmit.emit(this._group);
  }

  onCancelHandler() {
    const modal = document.querySelector('#delete_group');
    modal?.classList.toggle('hidden');
  }
}
