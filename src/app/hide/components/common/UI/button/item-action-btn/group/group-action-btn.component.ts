import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditDeviceService } from '../../../../../../shared/services/forms/device/edit-device.service';
import { IGroup } from '../../../../../../shared/types';

@Component({
  selector: 'app-group-action-btn',
  templateUrl: './group-action-btn.component.html',
  styleUrls: ['./group-action-btn.component.scss'],
})
export class GroupActionBtnComponent {
  @Input() target: string = '';
  @Input() group!: IGroup;

  @Output() onClick = new EventEmitter<IGroup>();

  constructor(private form: EditDeviceService) {}

  onClickHandler(group: IGroup) {
    this.onClick.emit(group);

    // this.form.form.setValue({
    //   name: group.name,
    //   description: group.description,
    //   device_group_id: group.device_group_id,
    // });

    const modal = document.querySelector(`#${this.target}`);
    modal?.classList.toggle('hidden');
  }
}
