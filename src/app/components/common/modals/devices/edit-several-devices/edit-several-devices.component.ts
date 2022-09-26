import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EditSeveralDevicesService } from '../../../../../shared/services/forms/device/edit-several-devices.service';

import { Option } from '../../../../../shared/types/input';
import { GroupClass } from '../../../../../shared/classes/groups/group.class';

@Component({
  selector: 'app-edit-several-devices',
  templateUrl: './edit-several-devices.component.html',
  styleUrls: ['./edit-several-devices.component.scss'],
})
export class EditSeveralDevicesComponent {
  @Input() isDataFetching: boolean = false;

  @Output() onSubmit = new EventEmitter();

  public currOption: Option = { value: '', html: '' };

  constructor(
    public form: EditSeveralDevicesService,
    private groups: GroupClass
  ) {}

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

    if (this.form.form.invalid) {
      return;
    } else {
      this.onSubmit.emit();
    }
  }

  onCancelHandler() {
    this.form.resetSubmitted();
    this.form.resetForm();

    this._form.patchValue({
      device_group_id: '',
    });
    this.currOption = { value: '', html: '' };

    const modal = document.querySelector('#edit_several_devices');
    modal?.classList.toggle('hidden');
  }
}
