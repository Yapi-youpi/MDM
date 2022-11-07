import { Component } from '@angular/core';
import { DeviceFiltersClass } from '../../../../shared/classes/devices/device-filters.class';
import { GroupClass } from '../../../../shared/classes/groups/group.class';
import { ConfigClass } from '../../../../shared/classes/configs/config.class';

@Component({
  selector: 'app-devices-filters',
  templateUrl: './devices-filters.component.html',
  styleUrls: ['./devices-filters.component.scss'],
})
export class DevicesFiltersComponent {
  constructor(
    private groups: GroupClass,
    public filters: DeviceFiltersClass,
    private config: ConfigClass
  ) {}

  get _configIDs() {
    if (!this.filters.configsIDs || this.filters.configsIDs.length === 0)
      return null;
    else {
      return this.filters.configsIDs.map((c) => {
        const idx = this.config.array.map((e) => e.ID).indexOf(c);
        return this.config.array[idx].name;
      });
    }
  }

  get _groupsIDs() {
    if (!this.filters.groupsIDs || this.filters.groupsIDs.length === 0)
      return null;
    else {
      return this.filters.groupsIDs.map((c) => {
        const idx = this.groups.array.map((e) => e.id).indexOf(c);
        return this.groups.array[idx].name;
      });
    }
  }

  onStatusRemoveHandler() {
    this.filters.resetParam('status');
  }

  onDateFromRemoveHandler() {
    this.filters.resetParam('dateFrom');
  }

  onDateToRemoveHandler() {
    this.filters.resetParam('dateTo');
  }

  onConfigsIDsRemoveHandler(name: string) {
    const idx = this.config.array.findIndex((c) => c.name === name);
    this.filters.resetParam('configsIDs', this.config.array[idx].ID);
  }

  onGroupsIDsRemoveHandler(name: string) {
    const idx = this.groups.array.findIndex((g) => g.name === name);
    this.filters.resetParam('groupsIDs', this.groups.array[idx].id);
  }
}
