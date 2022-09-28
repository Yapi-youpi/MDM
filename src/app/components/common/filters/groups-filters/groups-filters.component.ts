import { Component, Input } from '@angular/core';

import { IConfig } from '../../../../shared/types/config';
import { GroupFiltersClass } from '../../../../shared/classes/groups/group-filters.class';

@Component({
  selector: 'app-groups-filters',
  templateUrl: './groups-filters.component.html',
  styleUrls: ['./groups-filters.component.scss'],
})
export class GroupsFiltersComponent {
  @Input() configs!: IConfig[];

  constructor(public filters: GroupFiltersClass) {}

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
    const idx = this.configs.findIndex((c) => c.name === name);
    this.filters.resetParam('configsIDs', this.configs[idx].ID);
  }
}
