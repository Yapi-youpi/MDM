import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../../types/users';

@Pipe({
  name: 'filterUsers',
})
export class FilterUsersPipe implements PipeTransform {
  transform(
    users: IUser[],
    roles: Array<string>,
    groups: Array<string>
  ): IUser[] {
    return users.filter((user) => {
      return (
        (!roles?.length ? user : roles.includes(user.role)) &&
        (!groups?.length ? user : groups.includes(user.userTags[0]))
      );
    });
  }
}
