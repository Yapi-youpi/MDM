import { Component, Input } from '@angular/core';
import { edit } from '../../../../../shared/services/forms/group';
import { IConfig } from '../../../../../shared/types/config';
import { Option } from '../../../../../shared/types/input';
import { groupIcons } from '../../../../../shared/types/groups';
import { GroupLoaderClass } from '../../../../../shared/classes/groups/group-loader.class';
import { GroupClass } from '../../../../../shared/classes/groups/group.class';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss'],
})
export class EditGroupComponent {
  @Input() configs: IConfig[] = [];

  public currOption!: Option;
  public groupIcons: string[] = groupIcons;
  public isIconContainerShown: boolean = false;

  constructor(
    private form: edit,
    private loader: GroupLoaderClass,
    private group: GroupClass
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

  get _name() {
    return this._form.get('name');
  }

  get _description() {
    return this._form.get('description');
  }

  get _deviceConfigID() {
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
    return {
      value: this._deviceConfigID?.value,
      html: this.configs.find((c) => c.ID === this._deviceConfigID?.value)
        ?.name,
    } as Option;
  }

  toggleIconsContainer() {
    this.isIconContainerShown = !this.isIconContainerShown;
  }

  onSelectHandler(item: Option) {
    this._form.patchValue({
      deviceConfigID: item.value,
    });

    this.currOption = item;
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

    if (this._form.invalid) {
      return;
    } else {
      this.group
        .edit([{ ...this.group.current, ...this.form.values }])
        .then((res) => {
          if (res) {
            this.group.updateGroups(this.form.values);

            this.closeModal();
          }
        });
    }
  }

  onCancelHandler() {
    this.form.resetSubmitted();
    this.form.form.reset();

    this.closeModal();
  }

  closeModal() {
    const modal = document.querySelector('#edit_group');
    if (!modal?.classList.contains('hidden')) modal?.classList.toggle('hidden');
  }
}
