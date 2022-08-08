import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.scss'],
})
export class InputSwitchComponent {
  @Input() control!: FormControl;
  @Input() name: string = '';
  @Input() value: boolean = false;

  @Output() onChange = new EventEmitter();

  constructor() {}

  onChangeHandler() {
    this.onChange.emit();
  }
}
