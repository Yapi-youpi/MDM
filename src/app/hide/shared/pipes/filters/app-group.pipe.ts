import { Pipe, PipeTransform } from '@angular/core';
import { IApp } from '../../types';

@Pipe({
  name: 'appGroup',
})
export class AppGroupPipe implements PipeTransform {
  transform(apps: IApp[], value: string): IApp[] {
    return apps.filter((a) =>
      value === 'all' ? a : value === 'uploaded' ? !a.system : a.system
    );
  }
}
