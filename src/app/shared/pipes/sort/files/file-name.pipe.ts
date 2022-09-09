import { Pipe, PipeTransform } from '@angular/core';
import { DeviceFile } from '../../../types/devices';

@Pipe({
  name: 'fileName',
})
export class FileNamePipe implements PipeTransform {
  transform(files: DeviceFile[], asc: boolean): DeviceFile[] {
    return files.sort((a, b) =>
      asc
        ? b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        : a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
  }
}
