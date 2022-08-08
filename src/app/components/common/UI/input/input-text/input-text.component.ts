import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { inputWidth } from '../../../../../shared/types/input';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent {
  @Input() control!: FormControl;
  @Input() value: string = '';

  @Input() name: string = '';
  @Input() width: inputWidth = 'w-170';
  @Input() isError: boolean = false;

  @Output() onChange = new EventEmitter<string>();

  constructor() {}

  onChangeHandler(value: string) {
    this.onChange.emit(value);
  }
}
