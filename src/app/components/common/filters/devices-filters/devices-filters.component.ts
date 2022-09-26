import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DevicesConfig } from '../../../../shared/types/config';
import { DeviceFiltersClass } from '../../../../shared/classes/devices/device-filters.class';
import { GroupClass } from '../../../../shared/classes/groups/group.class';

@Component({
  selector: 'app-devices-filters',
  templateUrl: './devices-filters.component.html',
  styleUrls: ['./devices-filters.component.scss'],
})
export class DevicesFiltersComponent {
  @Input() configs!: DevicesConfig[];

  @Output() onStatusRemove = new EventEmitter();
  @Output() onDateFromRemove = new EventEmitter();
  @Output() onDateToRemove = new EventEmitter();
  @Output() onConfigsIDsRemove = new EventEmitter<string>();
  @Output() onGroupsIDsRemove = new EventEmitter<string>();

  constructor(private groups: GroupClass, public filters: DeviceFiltersClass) {}

  get _configIDs() {
    if (!this.filters.configsIDs || this.filters.configsIDs.length === 0)
      return null;
    else {
      return this.filters.configsIDs.map((c) => {
        const idx = this.configs.map((e) => e.ID).indexOf(c);
        return this.configs[idx].name;
      });
    }
  }

  get _groupsIDs() {
    if (!this.filters.groupsIDs || this.filters.groupsIDs.length === 0)
      return null;
    else {
      return this.filters.groupsIDs.map((c) => {
        const idx = this.groups.array.map((e) => e.id).indexOf(c);
        return this.groups[idx].name;
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
    const idx = this.groups.array.findIndex((g) => g.name === name);
    this.onGroupsIDsRemove.emit(this.groups[idx].id);
  }
}
