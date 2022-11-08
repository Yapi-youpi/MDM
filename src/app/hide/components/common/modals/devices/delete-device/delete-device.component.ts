import { Component } from '@angular/core';
import { DeviceClass, LoaderClass } from '../../../../../shared/classes';

@Component({
  selector: 'app-delete-device',
  templateUrl: './delete-device.component.html',
  styleUrls: ['./delete-device.component.scss'],
})
export class DeleteDeviceComponent {
  constructor(private device: DeviceClass, private _loader: LoaderClass) {}

  get loading$() {
    return this._loader.loading$;
  }

  get entity$() {
    return this._loader.entity$;
  }

  get _device() {
    return this.device.current;
  }

  onSubmitHandler() {
    if (this._device) {
      this.device.delete([this._device.device_id]).then((res) => {
        if (res) {
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
