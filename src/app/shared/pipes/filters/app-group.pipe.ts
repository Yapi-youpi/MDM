import { Pipe, PipeTransform } from '@angular/core';
import { App } from '../../types/apps';

@Pipe({
  name: 'appGroup',
})
export class AppGroupPipe implements PipeTransform {
  transform(apps: App[], value: string): App[] {
    return apps.filter((a) =>
      value === 'all' ? a : value === 'uploaded' ? !a.system : a.system
    );
  }
}
