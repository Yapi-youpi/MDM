import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

import { IDevice } from '../../types/devices';

@Pipe({
  name: 'devicesFilter',
})
export class DevicesFilterPipe implements PipeTransform {
  transform(
    devices: IDevice[] | null,
    status: boolean | null,
    dateFrom: string | null,
    dateTo: string | null,
    configIDs: string[] | null,
    groupIDs: string[] | null
  ): IDevice[] {
    if (!devices) return [];
    else {
      return devices.filter((d) => {
        return (
          (status !== null ? d.active_state === status : d) &&
          (dateFrom ? moment(d.updatedAt).isAfter(moment(dateFrom)) : d) &&
          (dateTo ? moment(d.updatedAt).isBefore(moment(dateTo)) : d) &&
          (configIDs && configIDs.length !== 0
            ? configIDs.some((el) => d.device_config_id === el)
            : d) &&
          (groupIDs && groupIDs.length !== 0
            ? groupIDs.some((el) => d.device_group_id === el)
            : d)
        );
      });
    }
  }
}
