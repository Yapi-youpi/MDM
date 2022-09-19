import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFile } from '../../../../../shared/types/files';

@Component({
  selector: 'app-delete-file',
  templateUrl: './delete-file.component.html',
  styleUrls: ['./delete-file.component.scss'],
})
export class DeleteFileComponent {
  @Input() file!: IFile;
  @Input() isDataFetching: boolean = false;

  @Output() onSubmit = new EventEmitter<IFile>();

  constructor() {}

  onSubmitHandler(file: IFile) {
    this.onSubmit.emit(file);
  }

  onCancelHandler() {
    const modal = document.querySelector('#file_delete');
    modal?.classList.toggle('hidden');
  }
}
