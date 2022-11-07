import { Pipe, PipeTransform } from '@angular/core';
import { IFile } from '../../../types';

@Pipe({
  name: 'fileName',
})
export class FileNamePipe implements PipeTransform {
  transform(files: IFile[], asc: boolean): IFile[] {
    return files.sort((a, b) =>
      asc
        ? b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        : a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
  }
}
