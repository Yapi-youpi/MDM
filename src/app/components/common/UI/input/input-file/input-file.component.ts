import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { inputWidth } from '../../../../../shared/types/input';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent {
  @Input() control: FormControl = new FormControl(null);

  @Input() name: string = '';
  @Input() width: inputWidth = 'w-170';
  @Input() isError: boolean = false;

  @Output() onChange = new EventEmitter<File>();

  public file!: File;

  constructor() {}

  get _name() {
    if (this.control.value) {
      if (!this.file) return null;
      else return this.file.name;
    } else return null;
  }

  get _size() {
    if (this.control.value) {
      if (!this.file) return null;
      else return this.file.size;
    } else return null;
  }

  onChangeHandler(event) {
    this.file = event.target.files[0];
    this.onChange.emit(event.target.files[0]);
  }
}
