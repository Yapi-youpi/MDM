import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(
    array: any[],
    value: string,
    arrayType:
      | 'device'
      | 'group'
      | 'app'
      | 'message'
      | 'mapMark'
      | 'config'
      | 'user'
      | 'question'
  ): any[] {
    if (arrayType === 'device')
      return array.filter((el) =>
        value !== '' ? el.name.toLowerCase().includes(value.toLowerCase()) : el
      );
    if (arrayType === 'group')
      return array.filter((el) =>
        value !== '' ? el.name.toLowerCase().includes(value.toLowerCase()) : el
      );
    if (arrayType === 'app')
      return array.filter((el) =>
        value !== '' ? el.name.toLowerCase().includes(value.toLowerCase()) : el
      );
    if (arrayType === 'message') return [];
    if (arrayType === 'mapMark') return [];
    if (arrayType === 'config') return [];
    if (arrayType === 'user') return [];
    if (arrayType === 'question') return [];

    return [];
  }
}
