import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent {
  @Input() public value: string = '';

  @Output() onChange = new EventEmitter<string>();

  public isSearchFocused: boolean = false;

  constructor() {}

  onChangeHandler(value: string) {
    this.onChange.emit(value);
  }
}
