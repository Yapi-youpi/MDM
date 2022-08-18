import { Component, EventEmitter, Input, Output } from '@angular/core';

import { GroupFilter } from '../../../../shared/types/filters';
import { DevicesConfig } from '../../../../shared/types/config';
import { DevicesGroup } from '../../../../shared/types/groups';

@Component({
  selector: 'app-groups-filters',
  templateUrl: './groups-filters.component.html',
  styleUrls: ['./groups-filters.component.scss'],
})
export class GroupsFiltersComponent {
  @Input() filter!: GroupFilter;
  @Input() configs!: DevicesConfig[];
  @Input() groups!: DevicesGroup[];

  @Output() onStatusRemove = new EventEmitter();
  @Output() onDateFromRemove = new EventEmitter();
  @Output() onDateToRemove = new EventEmitter();
  @Output() onConfigsIDsRemove = new EventEmitter<string>();
  @Output() onGroupsIDsRemove = new EventEmitter<string>();

  constructor() {}

  get _configIDs() {
    if (!this.filter.configsIDs || this.filter.configsIDs.length === 0)
      return null;
    else {
      return this.filter.configsIDs.map((c) => {
        const idx = this.configs.map((e) => e.ID).indexOf(c);
        return this.configs[idx].name;
      });
    }
  }

  onStatusRemoveHandler() {
    this.onStatusRemove.emit();
  }

  onDateFromRemoveHandler() {
    this.onDateFromRemove.emit();
  }

  onDateToRemoveHandler() {
    this.onDateToRemove.emit();
  }

  onConfigsIDsRemoveHandler(name: string) {
    const idx = this.configs.findIndex((c) => c.name === name);
    this.onConfigsIDsRemove.emit(this.configs[idx].ID);
  }

  onGroupsIDsRemoveHandler(name: string) {
    const idx = this.groups.findIndex((g) => g.name === name);
    this.onGroupsIDsRemove.emit(this.groups[idx].id);
  }
}
