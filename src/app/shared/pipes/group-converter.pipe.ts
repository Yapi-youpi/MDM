import { Pipe, PipeTransform } from '@angular/core';
import { IGroup } from '../types/groups';

@Pipe({
  name: 'groupConverter',
})
export class GroupConverterPipe implements PipeTransform {
  transform(id: string, groups: IGroup[]): string {
    const idx = groups.map((e) => e.id).indexOf(id);
    if (idx >= 0) return groups[idx].name;
    else return '';
  }
}
