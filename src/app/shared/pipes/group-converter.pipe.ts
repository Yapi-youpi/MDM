import { Pipe, PipeTransform } from '@angular/core';
import { DevicesGroup } from '../types/groups';

@Pipe({
  name: 'groupConverter',
})
export class GroupConverterPipe implements PipeTransform {
  transform(id: string, groups: DevicesGroup[]): string {
    const idx = groups.map((e) => e.id).indexOf(id);
    if (idx >= 0) return groups[idx].name;
    else return '';
  }
}
