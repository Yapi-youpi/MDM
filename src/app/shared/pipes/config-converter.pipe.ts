import { Pipe, PipeTransform } from '@angular/core';

import { IConfig } from '../types';

@Pipe({
  name: 'configConverter',
})
export class ConfigConverterPipe implements PipeTransform {
  transform(id: string, configs: IConfig[]): string {
    const idx = configs?.map((e) => e.ID).indexOf(id);
    return idx >= 0 ? configs[idx].name : '';
  }
}
