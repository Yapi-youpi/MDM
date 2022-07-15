import { Pipe, PipeTransform } from '@angular/core';
import { Users } from '../interfaces/interfaces';

@Pipe({
  name: 'filterUsers',
})
export class FilterUsersPipe implements PipeTransform {
  transform(users: Users[], filter: Array<string>): Users[] {
    return !users
      ? []
      : !filter?.length
      ? users
      : users.filter((item) => {
          if (filter.includes(item.role)) {
            return item.role;
          } else {
            return;
          }
        });
  }
}
