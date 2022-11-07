import { Pipe, PipeTransform } from '@angular/core';
import { IFile } from '../../types';

@Pipe({
  name: 'filesSort',
})
export class FilesSortPipe implements PipeTransform {
  transform(
    files: IFile[],
    sort: 'all' | 'import' | 'export' = 'all'
  ): IFile[] {
    return files.filter((f) =>
      sort === 'import' ? !f.camData : sort === 'export' ? f.camData : f
    );
  }
}
