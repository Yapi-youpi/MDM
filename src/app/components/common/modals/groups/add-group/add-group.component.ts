import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DevicesConfig } from '../../../../../shared/types/config';
import { Option } from '../../../../../shared/types/input';
import { add } from '../../../../../shared/services/forms/group';
import { groupIcons } from '../../../../../shared/types/groups';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent {
  @Input() configs: DevicesConfig[] = [];
  @Input() isDataFetching: boolean = false;

  @Output() public onSubmit = new EventEmitter();

  public groupIcons: string[] = groupIcons;
  public isIconContainerShown: boolean = false;

  constructor(private form: add) {}

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

  get _config_id() {
    return this._form.get('deviceConfigID');
  }

  get _iconID() {
    return this._form.get('iconID');
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
    const value = this._config_id?.value;
    const html = this.configs.find(
      (c) => c.ID === this._config_id?.value
    )?.name;

    return {
      value: value ? value : '',
      html: html ? html : '',
    };
  }

  toggleIconsContainer() {
    this.isIconContainerShown = !this.isIconContainerShown;
  }

  onSelectHandler(item: Option) {
    this._form.patchValue({
      deviceConfigID: item.value,
    });
  }

  onIconSelectHandler(event) {
    let img;
    if (event.target.src) {
      img = event.target.src;
    } else {
      img = event.target.querySelector('.img').src;
    }

    this.form.setIconBase64FromURL(img).then();
    this.toggleIconsContainer();
  }

  onSubmitHandler() {
    this.form.setSubmitted();

    if (this._iconID?.value === '') {
      this.form.setIconBase64FromURL('/assets/group-icons/rhombus.png').then();
    }

    if (this.form.form.invalid) {
      return;
    } else {
      this.onSubmit.emit();
    }
  }

  onCancelHandler() {
    this.form.reset();

    this._form.patchValue({
      deviceConfigID: '',
    });

    const modal = document.querySelector('#add_group');
    modal?.classList.toggle('hidden');
  }
}
