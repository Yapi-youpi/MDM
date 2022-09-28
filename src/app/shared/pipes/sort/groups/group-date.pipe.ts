import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment';

import { IGroup } from '../../../types/groups';

@Pipe({
  name: 'group_date',
})
export class GroupDatePipe implements PipeTransform {
  transform(groups: IGroup[], isDateAsc: boolean) {
    // FROM NEW TO OLD
    if (isDateAsc)
      return groups.sort((a, b) =>
        moment(b.updateTime) > moment(a.updateTime)
          ? 1
          : moment(b.updateTime) < moment(a.updateTime)
          ? -1
          : 0
      );
    // FROM OLD TO NEW
    else
      return groups.sort((a, b) =>
        moment(a.updateTime) > moment(b.updateTime)
          ? 1
          : moment(a.updateTime) < moment(b.updateTime)
          ? -1
          : 0
      );
  }
}
