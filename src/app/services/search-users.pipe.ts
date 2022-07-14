import { Pipe, PipeTransform } from '@angular/core';
import { Users } from '../interfaces/interfaces';

@Pipe({
  name: 'searchUsers',
})
export class SearchUsersPipe implements PipeTransform {
  transform(value: Users[], search: string): Users[] {
    return !value
      ? []
      : !search
      ? value
      : value.filter((item) => {
          if (item.name.toLowerCase().includes(search.toLowerCase())) {
            return item.name;
          } else {
            return;
          }
        });
  }
}
