import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(
    array: any,
    value: string,
    arrayType: 'device' | 'group' | 'app' | 'message' | 'file'
  ): any {
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
    if (arrayType === 'file')
      return array.filter((el) =>
        value !== '' ? el.name.toLowerCase().includes(value.toLowerCase()) : el
      );

    return [];
  }
}
