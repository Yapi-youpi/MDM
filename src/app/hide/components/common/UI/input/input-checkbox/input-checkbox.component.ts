import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss'],
})
export class InputCheckboxComponent {
  @Input() control!: FormControl;
  @Input() value: boolean = false;

  @Output() onChange = new EventEmitter<boolean>();

  constructor() {}

  onChangeHandler(value: boolean) {
    this.onChange.emit(value);
  }
}
