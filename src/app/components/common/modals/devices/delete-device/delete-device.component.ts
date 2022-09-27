import { Component } from '@angular/core';
import { DeviceClass } from '../../../../../shared/classes/devices/device.class';
import { DeviceLoaderClass } from '../../../../../shared/classes/devices/device-loader.class';

@Component({
  selector: 'app-delete-device',
  templateUrl: './delete-device.component.html',
  styleUrls: ['./delete-device.component.scss'],
})
export class DeleteDeviceComponent {
  constructor(private loader: DeviceLoaderClass, private device: DeviceClass) {}

  get _loading() {
    return this.loader.loading;
  }

  get _device() {
    return this.device.current;
  }

  onSubmitHandler() {
    if (this._device) {
      this.device.delete([this._device.device_id]).then((res) => {
        if (res) {
          // todo: delete from selected list in exists in selected list
          this.closeModal();
        }
      });
    }
  }

  closeModal() {
    const modal = document.querySelector('#delete_device');
    if (!modal?.classList.contains('hidden')) modal?.classList.toggle('hidden');
  }
}
