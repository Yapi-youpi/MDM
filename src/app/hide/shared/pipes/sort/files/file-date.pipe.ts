import { Pipe, PipeTransform } from '@angular/core';
import { IFile } from '../../../types';

@Pipe({
  name: 'fileDate',
})
export class FileDatePipe implements PipeTransform {
  transform(files: IFile[], asc: boolean): IFile[] {
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
