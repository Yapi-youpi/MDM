import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Device } from '../../../../../shared/types/devices';

@Component({
  selector: 'app-device-reload',
  templateUrl: './device-reload.component.html',
  styleUrls: ['./device-reload.component.scss']
})
export class DeviceReloadComponent {
  @Input() public device!: Device;
  @Input() isDataFetching: boolean = false;

  @Output() onSubmit = new EventEmitter<Device>();
  constructor() { }
  onSubmitHandler(device: Device) {
    this.onSubmit.emit(device);
  }

  onCancelHandler() {
    const modal = document.querySelector('#reload_device');
    modal?.classList.toggle('hidden');
  }
}
