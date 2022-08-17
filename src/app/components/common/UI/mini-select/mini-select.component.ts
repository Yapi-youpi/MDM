import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Option } from '../../../../shared/types/input';

@Component({
  selector: 'app-mini-select',
  templateUrl: './mini-select.component.html',
  styleUrls: ['./mini-select.component.scss'],
})
export class MiniSelectComponent implements OnChanges {
  @Input() open = false;
  @Input() state;
  @Input() header = '';
  @Input() options: Option[] = [];
  @Input() headerClass: string = '';
  @Input() arrowClass: string = '';
  public currentValue = '';
  @Output() onSelect = new EventEmitter<string>();
  constructor() {}

  ngOnChanges(changes) {
    for (let change in changes) {
      if (change === 'state' && changes[change].currentValue != true) {
        this.currentValue = this.header;
      }
    }
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
