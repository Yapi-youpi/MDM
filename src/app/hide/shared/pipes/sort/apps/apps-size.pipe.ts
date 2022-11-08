import { Pipe, PipeTransform } from '@angular/core';
import { IApp } from '../../../types';

@Pipe({
  name: 'apps_size',
})
export class AppsSizePipe implements PipeTransform {
  transform(apps: IApp[], isSizeAsc: boolean = false): IApp[] {
    return isSizeAsc
      ? // FROM BIG TO SMALL
        apps.sort((a, b) => b.fileByteSize - a.fileByteSize)
      : // FROM SMALL TO BIG
        apps.sort((a, b) => a.fileByteSize - b.fileByteSize);
  }
}
