import { Component, OnDestroy } from '@angular/core';
import { IOption } from '../../../../../shared/types';

import { filter } from '../../../../../shared/services/forms/group';
import { GroupFiltersClass } from '../../../../../shared/classes/groups/group-filters.class';
import { GroupSelectedClass } from '../../../../../shared/classes/groups/group-selected.class';
import { ConfigClass } from '../../../../../shared/classes/configs/config.class';

@Component({
  selector: 'app-filter-group',
  templateUrl: './filter-groups.component.html',
  styleUrls: ['./filter-groups.component.scss'],
})
export class FilterGroupsComponent implements OnDestroy {
  constructor(
    private form: filter,
    private filters: GroupFiltersClass,
    private selection: GroupSelectedClass,
    private config: ConfigClass
  ) {}

  ngOnDestroy() {
    this.filters.resetAll();
  }

  get _configs() {
    return this.config.array;
  }

  get _form() {
    return this.form.form;
  }

  // get _status_on() {
  //   return this._form.get('status-on');
  // }
  //
  // get _status_off() {
  //   return this._form.get('status-off');
  // }

  get _date_from() {
    return this._form.get('date-from');
  }

  get _date_to() {
    return this._form.get('date-to');
  }

  get _config_ids() {
    return this._form.get('config_ids');
  }

  get _options_configs() {
    return this._configs.map((c) => {
      return {
        value: c.ID,
        html: c.name,
        isSelected: false,
      } as IOption;
    });
  }

  // onStatusOnClick() {
  //   this._form.controls['status-on'].setValue(!this._status_on?.value);
  // }
  //
  // onStatusOffClick() {
  //   this._form.controls['status-off'].setValue(!this._status_off?.value);
  // }

  onConfigSelectHandler(options: IOption[]) {
    let data: string[] = [];

    options.forEach((o) => {
      if (o.isSelected) data.push(o.value);
    });

    this._form.controls['config_ids'].setValue(data);
  }

  onSubmitHandler() {
    this.filters.setParams();

    this.selection.cancelSelection();

    this.closeModal();
  }

  onCancelHandler() {
    this.form.reset();

    this.filters.resetAll();
    this.selection.cancelSelection();

    this.closeModal();
  }

  closeModal() {
    const modal = document.querySelector('#filter_groups');
    modal?.classList.toggle('hidden');
  }
}
