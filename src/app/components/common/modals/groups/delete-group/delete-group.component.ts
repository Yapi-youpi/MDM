import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DevicesGroup } from '../../../../../shared/types/groups';

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.scss'],
})
export class DeleteGroupComponent {
  @Input() group!: DevicesGroup;

  @Output() onSubmit = new EventEmitter<DevicesGroup>();

  constructor() {}

  onSubmitHandler(group: DevicesGroup) {
    this.onSubmit.emit(group);
  }

  onCancelHandler() {
    const modal = document.querySelector('#delete_group');
    modal?.classList.toggle('hidden');
  }
}
