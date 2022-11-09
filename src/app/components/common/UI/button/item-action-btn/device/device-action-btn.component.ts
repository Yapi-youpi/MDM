import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EditDeviceService } from '../../../../../../shared/services/forms/device/edit-device.service';

import { IDevice } from '../../../../../../shared/types/devices';

@Component({
  selector: 'app-device-action-btn',
  templateUrl: './device-action-btn.component.html',
  styleUrls: ['./device-action-btn.component.scss'],
})
export class DeviceActionBtnComponent {
  @Input() target: string = '';
  @Input() title: string = '';
  @Input() device!: IDevice;

  @Output() onClick = new EventEmitter<IDevice>();

  constructor(private form: EditDeviceService) {}

  onClickHandler(device: IDevice) {
    this.onClick.emit(device);

    this.form.form.setValue({
      name: device.name,
      description: device.description,
      device_group_id: device.device_group_id,
    });

    const modal = document.querySelector(`#${this.target}`);
    modal?.classList.toggle('hidden');
  }
}
