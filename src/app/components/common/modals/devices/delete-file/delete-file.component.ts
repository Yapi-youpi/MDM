import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeviceFile } from '../../../../../shared/types/devices';

@Component({
  selector: 'app-delete-file',
  templateUrl: './delete-file.component.html',
  styleUrls: ['./delete-file.component.scss'],
})
export class DeleteFileComponent {
  @Input() file!: DeviceFile;
  @Input() isDataFetching: boolean = false;

  @Output() onSubmit = new EventEmitter<DeviceFile>();

  constructor() {}

  onSubmitHandler(file: DeviceFile) {
    this.onSubmit.emit(file);
  }

  onCancelHandler() {
    const modal = document.querySelector('#file_delete');
    modal?.classList.toggle('hidden');
  }
}
