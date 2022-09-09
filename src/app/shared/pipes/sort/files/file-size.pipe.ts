import { Pipe, PipeTransform } from '@angular/core';
import { DeviceFile } from '../../../types/devices';

@Pipe({
  name: 'deviceFileSize',
})
export class DeviceFileSizePipe implements PipeTransform {
  transform(files: DeviceFile[], asc: boolean): DeviceFile[] {
    return files.sort((a, b) => (asc ? b.size - a.size : a.size - b.size));
  }
}
