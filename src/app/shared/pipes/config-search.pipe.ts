import { Pipe, PipeTransform } from '@angular/core';
import { IConfig } from '../types';

@Pipe({
  name: 'configSearch',
})
export class ConfigSearchPipe implements PipeTransform {
  transform(configs: IConfig[], search: string): IConfig[] {
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
