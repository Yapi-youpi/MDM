import { Component } from '@angular/core';
import { groupIcons, IOption } from '../../../../../shared/types';
import { add } from '../../../../../shared/services/forms/group';
import {
  ConfigClass,
  GroupClass,
  LoaderClass,
} from '../../../../../shared/classes';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent {
  public groupIcons: string[] = groupIcons;
  public isIconContainerShown: boolean = false;

  constructor(
    private form: add,
    private group: GroupClass,
    private _loader: LoaderClass,
    private config: ConfigClass
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

  get _config_id() {
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
    const value = this._config_id?.value;
    const html = this.config.array.find(
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

  onSelectHandler(item: IOption) {
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

  submitForm() {
    if (this.form.form.invalid) {
      return;
    } else {
      this.group.add(this.form.values).then((res) => {
        if (res) {
          this.closeModal();
        }
      });
    }
  }

  onSubmitHandler() {
    if (!this._iconID?.value) {
      this.form
        .setIconBase64FromURL('/assets/group-icons/rhombus.png')
        .then(() => {
          this.submitForm();
        });
    } else {
      this.submitForm();
    }
  }

  onCancelHandler() {
    this.form.reset();

    this._form.patchValue({
      deviceConfigID: '',
    });

    this.closeModal();
  }

  closeModal() {
    const modal = document.querySelector('#add_group');
    if (!modal?.classList.contains('hidden')) modal?.classList.toggle('hidden');
  }
}
