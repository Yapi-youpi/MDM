import { Component } from '@angular/core';
import { GroupFiltersClass } from '../../../../shared/classes/groups/group-filters.class';
import { ConfigClass } from '../../../../shared/classes/configs/config.class';

@Component({
  selector: 'app-groups-filters',
  templateUrl: './groups-filters.component.html',
  styleUrls: ['./groups-filters.component.scss'],
})
export class GroupsFiltersComponent {
  constructor(public filters: GroupFiltersClass, private config: ConfigClass) {}

  get _configs() {
    return this.config.array;
  }

  get _configIDs() {
    if (!this.filters.configsIDs || this.filters.configsIDs.length === 0)
      return null;
    else {
      return this.filters.configsIDs.map((c) => {
        const idx = this._configs.map((e) => e.ID).indexOf(c);
        return this._configs[idx].name;
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
    const idx = this._configs.findIndex((c) => c.name === name);
    this.filters.resetParam('configsIDs', this._configs[idx].ID);
  }
}
