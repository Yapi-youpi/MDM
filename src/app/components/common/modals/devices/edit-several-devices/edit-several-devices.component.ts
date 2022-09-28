import { Component } from '@angular/core';
import { EditSeveralDevicesService } from '../../../../../shared/services/forms/device/edit-several-devices.service';
import { Option } from '../../../../../shared/types/input';
import { GroupClass } from '../../../../../shared/classes/groups/group.class';
import { DeviceClass } from '../../../../../shared/classes/devices/device.class';
import { IDevice } from '../../../../../shared/types/devices';
import { DeviceLoaderClass } from '../../../../../shared/classes/devices/device-loader.class';
import { DeviceSelectedClass } from '../../../../../shared/classes/devices/device-selected.class';

@Component({
  selector: 'app-edit-several-devices',
  templateUrl: './edit-several-devices.component.html',
  styleUrls: ['./edit-several-devices.component.scss'],
})
export class EditSeveralDevicesComponent {
  public currOption: Option = { value: '', html: '' };

  constructor(
    public form: EditSeveralDevicesService,
    private group: GroupClass,
    private loader: DeviceLoaderClass,
    private device: DeviceClass,
    private dSelected: DeviceSelectedClass
  ) {}

  get _loading() {
    return this.loader.loading;
  }

  get _form() {
    return this.form.form;
  }

  get _isSubmitted() {
    return this.form.isSubmitted;
  }

  get _group_id() {
    return this._form.get('device_group_id');
  }

  get _state() {
    return this._form.get('active_state');
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

    if (this.form.form.invalid) {
      return;
    } else {
      const data: IDevice[] = this.device.array
        .filter((d) => this.dSelected.selectedIDs.includes(d.device_id))
        .map((d) => {
          return {
            ...d,
            device_group_id: this.form._group,
            active_state: this.form._state,
          };
        });

      this.device.edit(data).then((res) => {
        if (res) {
          if (data.length > 1) {
            this.dSelected.setListOfSelected([]);
          }
          this.closeModal();
        }
      });
    }
  }

  onCancelHandler() {
    this.form.resetSubmitted();
    this.form.resetForm();

    this._form.patchValue({
      device_group_id: '',
    });
    this.currOption = { value: '', html: '' };

    this.closeModal();
  }

  closeModal() {
    const modal = document.querySelector('#edit_several_devices');
    if (!modal?.classList.contains('hidden')) modal?.classList.toggle('hidden');
  }
}
