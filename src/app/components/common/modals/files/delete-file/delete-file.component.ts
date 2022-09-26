import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileClass } from '../../../../../shared/classes/files/file.class';

@Component({
  selector: 'app-delete-file',
  templateUrl: './delete-file.component.html',
  styleUrls: ['./delete-file.component.scss'],
})
export class DeleteFileComponent {
  @Input() isDataFetching: boolean = false;

  @Output() onSubmit = new EventEmitter();

  constructor(private files: FileClass) {}

  get _file() {
    return this.files.current.value;
  }

  onSubmitHandler() {
    this.onSubmit.emit();
  }

  onCancelHandler() {
    const modal = document.querySelector('#file_delete');
    modal?.classList.toggle('hidden');
  }
}
