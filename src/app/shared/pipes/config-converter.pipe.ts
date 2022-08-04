import { Pipe, PipeTransform } from '@angular/core';

import { DevicesConfig } from '../types/config';

@Pipe({
  name: 'configConverter',
})
export class ConfigConverterPipe implements PipeTransform {
  transform(id: string, configs: DevicesConfig[]): string {
    const idx = configs?.map((e) => e.ID).indexOf(id);
    return idx >= 0 ? configs[idx].name : '';
  }
}
