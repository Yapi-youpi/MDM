import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment';

import { DevicesGroup } from '../../types/groups';

@Pipe({
  name: 'groupFilter',
})
export class GroupFilterPipe implements PipeTransform {
  transform(
    groups: DevicesGroup[],
    status: boolean | null,
    dateFrom: string | null,
    dateTo: string | null,
    configIDs: string[] | null
  ): DevicesGroup[] {
    return groups.filter((g) => {
      return (
        (status !== null ? g.activeState === status : g) &&
        (dateFrom ? g.updateTime > dateFrom : g.updateTime > '') &&
        (dateTo
          ? g.updateTime < dateTo
          : g.updateTime < moment.utc(Infinity).format()) &&
        (configIDs && configIDs.length !== 0
          ? configIDs.some((el) => g.deviceConfigID === el)
          : g)
      );
    });
  }
}
