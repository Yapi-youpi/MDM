import { Pipe, PipeTransform } from '@angular/core';
import { Users } from '../../../interfaces/interfaces';

@Pipe({
  name: 'filterUsers',
})
export class FilterUsersPipe implements PipeTransform {
  transform(
    users: Users[],
    roles: Array<string>,
    groups: Array<string>
  ): Users[] {
    return users.filter((user) => {
      return (
        (!roles?.length ? user : roles.includes(user.role)) &&
        (!groups?.length ? user : groups.includes(user.userTags[0]))
      );
    });
  }
}
