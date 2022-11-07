import { Component } from '@angular/core';
import { EditDeviceService } from '../../../../../shared/services/forms/device/edit-device.service';
import { IOption } from '../../../../../shared/types';
import {
  DeviceClass,
  GroupClass,
  LoaderClass,
} from '../../../../../shared/classes';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.scss'],
})
export class EditDeviceComponent {
  public currOption!: IOption;

  constructor(
    public form: EditDeviceService,
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
      } as IOption;
    });
  }

  get _currOption() {
    return {
      value: this._group_id?.value,
      html: this.group.array.find((g) => g.id === this._group_id?.value)?.name,
    } as IOption;
  }

  onSelectHandler(item: IOption) {
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
