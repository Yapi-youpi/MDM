import { Pipe, PipeTransform } from '@angular/core';

import { IApp } from '../../../types';

@Pipe({
  name: 'apps_name',
})
export class AppsNamePipe implements PipeTransform {
  transform(apps: IApp[], isNameAsc: boolean): IApp[] {
    // FROM A ENG TO A RU
    if (isNameAsc)
      return apps.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    // FROM A RU TO A ENG
    else
      return apps.sort((a, b) =>
        b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      );
  }
}
