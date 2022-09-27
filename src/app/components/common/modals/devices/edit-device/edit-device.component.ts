import { Component } from '@angular/core';
import { EditDeviceService } from '../../../../../shared/services/forms/device/edit-device.service';
import { Option } from '../../../../../shared/types/input';
import { GroupClass } from '../../../../../shared/classes/groups/group.class';
import { DeviceClass } from '../../../../../shared/classes/devices/device.class';
import { DeviceLoaderClass } from '../../../../../shared/classes/devices/device-loader.class';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.scss'],
})
export class EditDeviceComponent {
  public currOption!: Option;

  constructor(
    public form: EditDeviceService,
    private group: GroupClass,
    private loader: DeviceLoaderClass,
    private device: DeviceClass
  ) {}

  get _loading() {
    return this.loader.loading;
  }

  get _form() {
    return this.form.form;
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

  get _isSubmitted() {
    return this.form.isSubmitted;
  }

  get _options() {
    return this.group.array.map((g) => {
      return {
        value: g.id,
        html: g.name,
      } as Option;
    });
  }

  get _currOption() {
    return {
      value: this._group_id?.value,
      html: this.group.array.find((g) => g.id === this._group_id?.value)?.name,
    } as Option;
  }

  onSelectHandler(item: Option) {
    this._form.patchValue({
      device_group_id: item.value,
    });

    this.currOption = item;
  }

  onSubmitHandler() {
    this.form.setSubmitted();

    if (this._form.invalid) {
      return;
    } else {
      const device = this.device.current;

      if (device) {
        this.device
          .edit([
            {
              ...device,
              name: this.form._name,
              description: this.form._description,
              device_group_id: this.form._group_id,
            },
          ])
          .then((res) => {
            if (res) {
              this.closeModal();
            }
          });
      }
    }
  }

  onCancelHandler() {
    this.form.resetSubmitted();
    this.form.form.reset();

    this.closeModal();
  }

  closeModal() {
    const modal = document.querySelector('#edit_device');
    if (!modal?.classList.contains('hidden')) modal?.classList.toggle('hidden');
  }
}
