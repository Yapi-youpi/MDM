import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent {
  @Output() onClick = new EventEmitter();

  constructor() {}

  onClickHandler() {
    this.onClick.emit();
  }
}
