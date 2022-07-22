import { Component, EventEmitter, Input, Output } from "@angular/core";
import { inputWidth } from "../../../../../shared/types/input";

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent  {
  @Input() value: string = ''

  @Input() name: string = '';
  @Input() width: inputWidth = 'w-170';
  @Input() isError: boolean = false;

  @Output() onChange = new EventEmitter<File>();

  public file!: File;

  constructor() { }

  get _size() {
    if (!this.file) return null
    else return (this.file.size / (1024 * 1024)).toFixed(2) + 'Мб'
  }

  onChangeHandler(event) {
    console.log(event.target.files[0])
    this.file = event.target.files[0];
    this.onChange.emit(event.target.files[0])
  }
}
