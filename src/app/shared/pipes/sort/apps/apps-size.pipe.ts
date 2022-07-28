import { Pipe, PipeTransform } from '@angular/core';
import { App } from '../../../types/apps';

@Pipe({
  name: 'apps_size',
})
export class AppsSizePipe implements PipeTransform {
  transform(apps: App[], isSizeAsc: boolean = false): App[] {
    return isSizeAsc
      ? apps.sort((a, b) => a.fileByteSize - b.fileByteSize)
      : apps.sort((a, b) => b.fileByteSize - a.fileByteSize);
  }
}
