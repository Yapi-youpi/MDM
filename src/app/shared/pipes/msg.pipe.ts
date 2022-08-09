import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msg',
})
export class MsgPipe implements PipeTransform {
  transform(
    msgs: any[],
    isSort: boolean,
    sortParam: 'date' | 'target' | 'status'
  ): any[] {
    if (sortParam === 'date') {
      if (isSort) {
        return msgs.sort((a, b) => (a.date < b.date ? -1 : 1));
      } else return msgs.sort((a, b) => (a.date > b.date ? -1 : 1));
    }

    if (sortParam === 'target') {
      if (isSort) {
        return msgs.sort((a, b) => (a.target > b.target ? 1 : -1));
      } else return msgs.sort((a, b) => (a.target < b.target ? 1 : -1));
    }

    if (sortParam === 'status') {
      if (isSort) {
        return msgs.sort((a, b) =>
          a.status.toLowerCase().localeCompare(b.status.toLowerCase())
        );
      } else
        return msgs.sort((a, b) =>
          b.status.toLowerCase().localeCompare(a.status.toLowerCase())
        );
    }

    return msgs;
  }
}
