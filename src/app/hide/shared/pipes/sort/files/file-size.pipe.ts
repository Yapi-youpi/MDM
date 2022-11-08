import { Pipe, PipeTransform } from '@angular/core';
import { IFile } from '../../../types';

@Pipe({
  name: 'deviceFileSize',
})
export class DeviceFileSizePipe implements PipeTransform {
  transform(files: IFile[], asc: boolean): IFile[] {
    return files.sort((a, b) => (asc ? b.size - a.size : a.size - b.size));
  }
}
