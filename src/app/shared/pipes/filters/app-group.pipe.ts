import { Pipe, PipeTransform } from '@angular/core';
import { AppsGroup } from '../../types/apps';

@Pipe({
  name: 'appGroup',
})
export class AppGroupPipe implements PipeTransform {
  transform(groups: AppsGroup, value: string): AppsGroup {
    switch (value) {
      case 'all':
        return groups;

      case 'uploaded':
        return Object.fromEntries(
          Object.entries(groups).filter(([, val]) => !val[0].system)
        );

      case 'system':
        return Object.fromEntries(
          Object.entries(groups).filter(([, val]) => val[0].system)
        );
      default:
        return {};
    }
  }
}
