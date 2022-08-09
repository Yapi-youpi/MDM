import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '../../types/message';

@Pipe({
  name: 'msgFilter',
})
export class MsgFilterPipe implements PipeTransform {
  transform(
    messages: Message[],
    status: boolean | null,
    dateFrom: string | null,
    dateTo: string | null
  ): Message[] {
    if (!messages) return [];
    return messages.filter((m) => {
      return (
        (status !== null ? m.status === status : m) &&
        (dateFrom ? m.date > dateFrom : m) &&
        (dateTo ? m.date < dateTo : m)
      );
    });
  }
}
