import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filter-btn',
  templateUrl: './filter-btn.component.html',
  styleUrls: ['./filter-btn.component.scss'],
})
export class FilterBtnComponent {
  @Input() public target: string = '';

  constructor() {}

  onClickHandler() {
    const modal = document.querySelector(`#${this.target}`);
    modal?.classList.toggle('hidden');
  }
}
