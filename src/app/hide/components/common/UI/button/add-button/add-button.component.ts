import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss'],
})
export class AddButtonComponent {
  @Input() public title: string = 'Добавить';
  @Input() public target: string = '';

  constructor() {}

  onClickHandler() {
    const modal = document.querySelector(`#${this.target}`);
    modal?.classList.toggle('hidden');
  }
}
