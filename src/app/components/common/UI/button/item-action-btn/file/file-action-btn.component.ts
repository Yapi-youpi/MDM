import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFile } from '../../../../../../shared/types/files';

@Component({
  selector: 'app-file-action-btn',
  templateUrl: './file-action-btn.component.html',
  styleUrls: ['./file-action-btn.component.scss'],
})
export class FileActionBtnComponent {
  @Input() target: string = '';
  @Input() file!: IFile;

  @Output() onClick = new EventEmitter<IFile>();

  constructor() {}

  onClickHandler(file: IFile) {
    this.onClick.emit(file);

    const modal = document.querySelector(`#${this.target}`);
    modal?.classList.toggle('hidden');
  }
}
