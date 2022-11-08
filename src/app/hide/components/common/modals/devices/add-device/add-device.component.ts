import { Component } from '@angular/core';
import { AddDeviceService } from '../../../../../shared/services/forms/device/add-device.service';
import { IOption } from '../../../../../shared/types';
import { GroupClass } from '../../../../../shared/classes/groups/group.class';
import { DeviceClass } from '../../../../../shared/classes/devices/device.class';
import { LoaderClass } from '../../../../../shared/classes';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss'],
})
export class AddDeviceComponent {
  constructor(
    public form: AddDeviceService,
    private group: GroupClass,
    private device: DeviceClass,
    private _loader: LoaderClass
  ) {}

  get loading$() {
    return this._loader.loading$;
  }

  get entity$() {
    return this._loader.entity$;
  }

  get _form() {
    return this.form.form;
  }

  get _isSubmitted() {
    return this.form.isSubmitted;
  }

  get _name() {
    return this._form.get('name');
  }

  get _description() {
    return this._form.get('description');
  }

  get _group_id() {
    return this._form.get('device_group_id');
  }

  get _options() {
    return this.group.array.map((g) => {
      return {
        value: g.id,
        html: g.name,
      } as IOption;
    });
  }

  get _currOption() {
    const value = this._group_id?.value;
    const html = this.group.array.find(
      (g) => g.id === this._group_id?.value
    )?.name;

    return {
      value: value ? value : '',
      html: html ? html : '',
    } as IOption;
  }

  onSelectHandler(item: IOption) {
    this._form.patchValue({
      device_group_id: item.value,
    });
  }

  onSubmitHandler() {
    this.form.setFormSubmitted();

    if (this.form.form.invalid) {
      return;
    } else {
      this.device
        .add({
          name: this.form._name,
          description: this.form._desc,
          device_group_id: this.form._group,
        })
        .then((res) => {
          if (res) {
            this.closeModal();

            const modalQR = document.querySelector('#qr_code');
            if (modalQR?.classList.contains('hidden'))
              modalQR?.classList.toggle('hidden');

            this.form.resetForm();
          }
        });
    }
  }

  onCancelHandler() {
    this.form.resetForm();

    this._form.patchValue({
      device_group_id: '',
    });

    this.closeModal();
  }

  closeModal() {
    const modal = document.querySelector('#add_device');
    if (!modal?.classList.contains('hidden')) modal?.classList.toggle('hidden');
  }
}
