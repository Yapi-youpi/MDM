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
  @Input() headerClass: string = '';
  @Input() arrowClass: string = '';
  public currentValue = '';
  @Output() onSelect = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {
    this.currentValue = this.header;
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event) {
    // console.log(event.target);
    if (
      event.target.classList.contains('select__head') ||
      !event.target.classList.contains('select__item')
    ) {
      this.open = false;
    }
  }

  openSelect() {
    this.open = true;
  }

  selectOption(option: Option) {
    this.currentValue = option.html;
    this.open = !this.open;
    this.onSelect.emit(option.value);
  }
}
