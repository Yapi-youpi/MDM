import { Component, Input } from '@angular/core';
import { IConfig } from '../../../../../shared/types/config';
import { editSeveral } from '../../../../../shared/services/forms/group';
import { Option } from '../../../../../shared/types/input';
import { GroupLoaderClass } from '../../../../../shared/classes/groups/group-loader.class';
import { GroupClass } from '../../../../../shared/classes/groups/group.class';
import { IGroup } from '../../../../../shared/types/groups';
import { GroupSelectedClass } from '../../../../../shared/classes/groups/group-selected.class';

@Component({
  selector: 'app-edit-several-groups',
  templateUrl: './edit-several-groups.component.html',
  styleUrls: ['./edit-several-groups.component.scss'],
})
export class EditSeveralGroupsComponent {
  @Input() configs!: IConfig[];

  public currOption: Option = { value: '', html: '' };

  constructor(
    private form: editSeveral,
    private loader: GroupLoaderClass,
    private group: GroupClass,
    private gSelected: GroupSelectedClass
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

  get _config() {
    return this._form.get('deviceConfigID');
  }

  get _state() {
    return this._form.get('activeState');
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
      value: this._config?.value,
      html: this.configs.find((c) => c.ID === this._config?.value)?.name,
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

    if (this.form.form.invalid) {
      return;
    } else {
      const data: IGroup[] = this.group.array
        .filter((g) => this.gSelected.selectedIDs.includes(g.id))
        .map((g) => {
          return {
            ...g,
            deviceConfigID: this.form._config,
            activeState: this.form._state,
          };
        });

      this.group.edit(data).then((res) => {
        if (res) {
          if (data.length > 1) this.gSelected.setListOfSelected([]);
          this.group.updateGroups(undefined, true, data);
          this.closeModal();
        }
      });
    }
  }

  onCancelHandler() {
    this.form.resetSubmitted();
    this.form.resetForm();

    this._form.patchValue({
      deviceConfigID: '',
    });
    this.currOption = { value: '', html: '' };

    this.closeModal();
  }

  closeModal() {
    const modal = document.querySelector('#edit_several_groups');
    if (!modal?.classList.contains('hidden')) modal?.classList.toggle('hidden');
  }
}
