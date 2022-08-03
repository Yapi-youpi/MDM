import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-card-menu-btn',
  templateUrl: './card-menu-btn.component.html',
  styleUrls: ['./card-menu-btn.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardMenuBtnComponent {
  @Input() public target: string = '';
  @Input() public disabled?: boolean = false;
  @Input() public bg: string = '';
  @Output() public onClick = new EventEmitter();
  constructor() {}

  onClickHandler() {
    this.onClick.emit();
    const modal = document.getElementById(this.target);
    modal?.classList.toggle('hidden');
  }
}
