import { Component, Input, OnDestroy } from '@angular/core';

import { IConfig } from '../../../../../shared/types/config';
import { Option } from '../../../../../shared/types/input';

import { filter } from '../../../../../shared/services/forms/group';
import { GroupFiltersClass } from '../../../../../shared/classes/groups/group-filters.class';
import { GroupSelectedClass } from '../../../../../shared/classes/groups/group-selected.class';

@Component({
  selector: 'app-filter-group',
  templateUrl: './filter-groups.component.html',
  styleUrls: ['./filter-groups.component.scss'],
})
export class FilterGroupsComponent implements OnDestroy {
  @Input() configs!: IConfig[];

  constructor(
    private form: filter,
    private filters: GroupFiltersClass,
    private selection: GroupSelectedClass
  ) {}

  ngOnDestroy() {
    this.filters.resetAll();
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
    return this.configs.map((c) => {
      return {
        value: c.ID,
        html: c.name,
        isSelected: false,
      } as Option;
    });
  }

  // onStatusOnClick() {
  //   this._form.controls['status-on'].setValue(!this._status_on?.value);
  // }
  //
  // onStatusOffClick() {
  //   this._form.controls['status-off'].setValue(!this._status_off?.value);
  // }

  onConfigSelectHandler(options: Option[]) {
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
