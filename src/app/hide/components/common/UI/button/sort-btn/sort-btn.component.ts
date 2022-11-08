import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort-btn',
  templateUrl: './sort-btn.component.html',
  styleUrls: ['./sort-btn.component.scss'],
})
export class SortBtnComponent {
  @Input() title: string = '';
  @Input() isSortAsc: boolean = true;

  @Output() onCLick = new EventEmitter();

  constructor() {}

  onClickHandler() {
    this.onCLick.emit();
  }
}
