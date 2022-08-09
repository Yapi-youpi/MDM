import { Component, EventEmitter, Input, Output } from '@angular/core';
import { edit } from '../../../../../shared/services/forms/group';
import { DevicesConfig } from '../../../../../shared/types/config';
import { Option } from '../../../../../shared/types/input';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss'],
})
export class EditGroupComponent {
  @Input() configs: DevicesConfig[] = [];
  @Input() isDataFetching: boolean = false;

  @Output() onSubmit = new EventEmitter();

  public currOption!: Option;

  constructor(private form: edit) {}

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

  get _deviceConfigID() {
    return this._form.get('deviceConfigID');
  }

  get _options() {
    return this.configs.map((c) => {
      return {
        value: c.ID,
        html: c.name,
      } as Option;
    });
  }

  get _currOption() {
    return {
      value: this._deviceConfigID?.value,
      html: this.configs.find((c) => c.ID === this._deviceConfigID?.value)
        ?.name,
    } as Option;
  }

  onSelectHandler(item: Option) {
    this._form.patchValue({
      deviceConfigID: item.value,
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

    const modal = document.querySelector('#edit_group');
    modal?.classList.toggle('hidden');
  }
}
