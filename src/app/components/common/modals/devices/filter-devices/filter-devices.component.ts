import { Component, OnDestroy } from '@angular/core';

import { filter } from 'src/app/shared/services/forms/device';
import { IOption } from '../../../../../shared/types';
import { GroupClass } from '../../../../../shared/classes/groups/group.class';
import { DeviceFiltersClass } from '../../../../../shared/classes/devices/device-filters.class';
import { DeviceSelectedClass } from '../../../../../shared/classes/devices/device-selected.class';
import { ConfigClass } from '../../../../../shared/classes/configs/config.class';

@Component({
  selector: 'app-filter-devices',
  templateUrl: './filter-devices.component.html',
  styleUrls: ['./filter-devices.component.scss'],
})
export class FilterDevicesComponent implements OnDestroy {
  constructor(
    private form: filter,
    private groups: GroupClass,
    private filters: DeviceFiltersClass,
    private selection: DeviceSelectedClass,
    private config: ConfigClass
  ) {}

  ngOnDestroy() {
    this.filters.resetAll();
  }

  get _form() {
    return this.form.form;
  }

  get _status_on() {
    return this._form.get('status-on');
  }

  get _status_off() {
    return this._form.get('status-off');
  }

  get _date_from() {
    return this._form.get('date-from');
  }

  get _date_to() {
    return this._form.get('date-to');
  }

  get _config_ids() {
    return this._form.get('config_ids');
  }

  get _group_ids() {
    return this._form.get('group_ids');
  }

  get _options_configs() {
    return this.config.array.map((c) => {
      return {
        value: c.ID,
        html: c.name,
        isSelected: false,
      } as IOption;
    });
  }

  get _options_groups() {
    return this.groups.array.map((g) => {
      return {
        value: g.id,
        html: g.name,
        isSelected: false,
      } as IOption;
    });
  }

  onStatusOnClick() {
    this._form.controls['status-on'].setValue(!this._status_on?.value);
  }

  onStatusOffClick() {
    this._form.controls['status-off'].setValue(!this._status_off?.value);
  }

  onConfigSelectHandler(options: IOption[]) {
    let data: string[] = [];

    options.forEach((o) => {
      if (o.isSelected) data.push(o.value);
    });

    this._form.controls['config_ids'].setValue(data);
  }

  onGroupSelectHandler(options: IOption[]) {
    let data: string[] = [];

    options.forEach((o) => {
      if (o.isSelected) data.push(o.value);
    });

    this._form.controls['group_ids'].setValue(data);
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
    const modal = document.querySelector('#filter_devices');
    if (!modal?.classList.contains('hidden')) modal?.classList.toggle('hidden');
  }
}
