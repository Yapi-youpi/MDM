import { Pipe, PipeTransform } from '@angular/core';
import { DeviceFile } from '../../../types/devices';

@Pipe({
  name: 'fileDate',
})
export class FileDatePipe implements PipeTransform {
  transform(files: DeviceFile[], asc: boolean): DeviceFile[] {
    return files.sort((a, b) => {
      const bDate: any = new Date(b.lastUpdate * 1000).toLocaleDateString(
        'ru-RU'
      );
      const aDate: any = new Date(a.lastUpdate * 1000).toLocaleDateString(
        'ru-RU'
      );

      return asc ? bDate - aDate : aDate - bDate;
    });
  }
}
