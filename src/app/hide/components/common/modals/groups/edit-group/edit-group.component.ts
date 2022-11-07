import { Component } from '@angular/core';
import { edit } from '../../../../../shared/services/forms/group';
import { groupIcons, IOption } from '../../../../../shared/types';
import {
  ConfigClass,
  GroupClass,
  LoaderClass,
} from '../../../../../shared/classes';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss'],
})
export class EditGroupComponent {
  public currOption!: IOption;
  public groupIcons: string[] = groupIcons;
  public isIconContainerShown: boolean = false;

  constructor(
    private form: edit,
    private group: GroupClass,
    private config: ConfigClass,
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

  get _deviceConfigID() {
    return this._form.get('deviceConfigID');
  }

  get _iconID() {
    return this._form.get('iconID');
  }

  get _options() {
    return this.config.array.map((c) => {
      return {
        value: c.ID,
        html: c.name,
      } as IOption;
    });
  }

  get _currOption() {
    return {
      value: this._deviceConfigID?.value,
      html: this.config.array.find((c) => c.ID === this._deviceConfigID?.value)
        ?.name,
    } as IOption;
  }

  toggleIconsContainer() {
    this.isIconContainerShown = !this.isIconContainerShown;
  }

  onSelectHandler(item: IOption) {
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
