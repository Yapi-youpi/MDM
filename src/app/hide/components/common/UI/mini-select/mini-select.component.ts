import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { IOption } from '../../../../shared/types';

@Component({
  selector: 'app-mini-select',
  templateUrl: './mini-select.component.html',
  styleUrls: ['./mini-select.component.scss'],
})
export class MiniSelectComponent implements OnChanges {
  @Input() open = false;
  @Input() state;
  @Input() header = '';
  @Input() options: IOption[] = [];
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
    if (!event.target.classList.contains('select__item')) {
      this.open = false;
    }
  }

  openSelect() {
    this.open = true;
  }

  selectOption(option: IOption) {
    this.currentValue = option.html;
    this.open = !this.open;
    this.onSelect.emit(option.value);
  }
}
