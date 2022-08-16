import { Pipe, PipeTransform } from '@angular/core';
import { DevicesConfig } from '../../interfaces/interfaces';

@Pipe({
  name: 'configSearch',
})
export class ConfigSearchPipe implements PipeTransform {
  transform(configs: DevicesConfig[], search: string): DevicesConfig[] {
    return !search
      ? configs
      : configs.filter((item) => {
          if (item.name.toLowerCase().includes(search.toLowerCase())) {
            return item.name;
          } else if (
            item.description.toLowerCase().includes(search.toLowerCase())
          ) {
            return item.description;
          } else {
            return;
          }
        });
  }
}
