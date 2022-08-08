import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditDeviceService } from '../../../../../../shared/services/forms/device/edit-device.service';
import { DevicesGroup } from '../../../../../../shared/types/groups';

@Component({
  selector: 'app-group-action-btn',
  templateUrl: './group-action-btn.component.html',
  styleUrls: ['./group-action-btn.component.scss'],
})
export class GroupActionBtnComponent {
  @Input() target: string = '';
  @Input() group!: DevicesGroup;

  @Output() onClick = new EventEmitter<DevicesGroup>();

  constructor(private form: EditDeviceService) {}

  onClickHandler(group: DevicesGroup) {
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
