import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeviceFile } from '../../../../../../shared/types/devices';

@Component({
  selector: 'app-file-action-btn',
  templateUrl: './file-action-btn.component.html',
  styleUrls: ['./file-action-btn.component.scss'],
})
export class FileActionBtnComponent {
  @Input() target: string = '';
  @Input() file!: DeviceFile;

  @Output() onClick = new EventEmitter<DeviceFile>();

  constructor() {}

  onClickHandler(file: DeviceFile) {
    this.onClick.emit(file);

    const modal = document.querySelector(`#${this.target}`);
    modal?.classList.toggle('hidden');
  }
}
