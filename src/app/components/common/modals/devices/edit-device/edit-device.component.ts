import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EditDeviceService } from '../../../../../shared/services/forms/device/edit-device.service';

import { Option } from '../../../../../shared/types/input';
import { GroupClass } from '../../../../../shared/classes/groups/group.class';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.scss'],
})
export class EditDeviceComponent {
  @Input() isDataFetching: boolean = false;

  @Output() public onSubmit = new EventEmitter();

  public currOption!: Option;

  constructor(public form: EditDeviceService, private groups: GroupClass) {}

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
    return this.groups.array.map((g) => {
      return {
        value: g.id,
        html: g.name,
      } as Option;
    });
  }

  get _currOption() {
    return {
      value: this._group_id?.value,
      html: this.groups.array.find((g) => g.id === this._group_id?.value)?.name,
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
      this.onSubmit.emit();
    }
  }

  onCancelHandler() {
    this.form.resetSubmitted();
    this.form.form.reset();

    const modal = document.querySelector('#edit_device');
    modal?.classList.toggle('hidden');
  }
}
