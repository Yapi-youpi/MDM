import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeviceClass } from '../../../../../shared/classes/devices/device.class';

@Component({
  selector: 'app-delete-device',
  templateUrl: './delete-device.component.html',
  styleUrls: ['./delete-device.component.scss'],
})
export class DeleteDeviceComponent {
  @Input() isDataFetching: boolean = false;

  @Output() onSubmit = new EventEmitter();

  constructor(private device: DeviceClass) {}

  get _device() {
    return this.device.current.value;
  }

  onSubmitHandler() {
    this.onSubmit.emit();
  }

  onCancelHandler() {
    const modal = document.querySelector('#delete_device');
    modal?.classList.toggle('hidden');
  }
}
