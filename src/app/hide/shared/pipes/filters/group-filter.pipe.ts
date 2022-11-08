import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment';

import { IGroup } from '../../types';

@Pipe({
  name: 'groupFilter',
})
export class GroupFilterPipe implements PipeTransform {
  transform(
    groups: IGroup[],
    status: boolean | null,
    dateFrom: string | null,
    dateTo: string | null,
    configIDs: string[] | null
  ): IGroup[] {
    return groups.filter((g) => {
      return (
        (status !== null ? g.activeState === status : g) &&
        (dateFrom ? moment(g.updateTime).isAfter(moment(dateFrom)) : g) &&
        (dateTo ? moment(g.updateTime).isBefore(dateTo) : g) &&
        (configIDs && configIDs.length !== 0
          ? configIDs.some((el) => g.deviceConfigID === el)
          : g)
      );
    });
  }
}
