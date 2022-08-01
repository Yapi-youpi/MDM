import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Option } from '../../../../shared/types/input';

@Component({
  selector: 'app-mini-select',
  templateUrl: './mini-select.component.html',
  styleUrls: ['./mini-select.component.scss'],
})
export class MiniSelectComponent implements OnInit {
  @Input() open = false;
  @Input() header = '';
  @Input() options: Option[] = [];
  @Output() onSelect = new EventEmitter<Option>();
  public currentValue = '';
  constructor() {}

  ngOnInit(): void {
    this.currentValue = this.header;
  }
  // @HostListener('document:mousedown', ['$event'])
  // onGlobalClick(event): void {
  //   if (!event.target.classList.contains('select__list')) {
  //     this.open = false;
  //   }
  // }

  openSelect() {
    let elem = document.getElementById(this.header);
    let el = document.getElementById('select_' + this.header);
    console.log(el);
    el?.classList.toggle('opened');
    elem?.classList.toggle('open');
    this.open = !this.open;
  }

  selectOption(option: Option) {
    this.currentValue = option.html;
    this.open = !this.open;
    let elem = document.getElementById(this.header);
    if (elem) {
      elem.classList.toggle('open');
    }
    this.onSelect.emit(option);
  }
}
