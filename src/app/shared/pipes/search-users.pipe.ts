import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../types';

@Pipe({
  name: 'searchUsers',
})
export class SearchUsersPipe implements PipeTransform {
  transform(value: IUser[], search: string): IUser[] {
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
