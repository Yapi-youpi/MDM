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
    if (arrayType === 'device' || arrayType === 'group')
      return !value
        ? array
        : array.filter((item) => {
            if (item.name.toLowerCase().includes(value.toLowerCase())) {
              return item.name;
            } else if (
              item.description.toLowerCase().includes(value.toLowerCase())
            ) {
              return item.description;
            } else {
              return;
            }
          });

    if (arrayType === 'app')
      return array.filter((el) =>
        value !== '' ? el.name.toLowerCase().includes(value.toLowerCase()) : el
      );
    if (arrayType === 'message')
      return array.filter((el) =>
        value ? el.text.toLowerCase().includes(value.toLowerCase()) : el
      );
    if (arrayType === 'mapMark') return [];
    if (arrayType === 'config') return [];
    if (arrayType === 'user') return [];
    if (arrayType === 'question') return [];

    return [];
  }
}
