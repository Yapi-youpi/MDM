import { Pipe, PipeTransform } from '@angular/core';
import { DeviceFile } from '../../types/devices';

@Pipe({
  name: 'filesSort',
})
export class FilesSortPipe implements PipeTransform {
  transform(
    files: DeviceFile[],
    sort: 'all' | 'import' | 'export' = 'all'
  ): DeviceFile[] {
    return files.filter((f) =>
      sort === 'import' ? !f.camData : sort === 'export' ? f.camData : f
    );
  }
}
