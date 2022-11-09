import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { inputWidth, IOption } from '../../../../../shared/types/input';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent {
  @Input() color: 'common' | 'light' = 'common';
  @Input() width: inputWidth = 'w-170';
  @Input() options: IOption[] = [];
  @Input() currOption!: IOption;
  @Input() isError: boolean = false;
  @Input() disabled: boolean = false;

  @Output() onSelect = new EventEmitter<IOption>();

  public isDropdownHidden: boolean = true;
  public copy: IOption[] = [];

  constructor() {}

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    if (
      !event.target.classList.contains('dropdown-item') &&
      !event.target.classList.contains('select-field')
    ) {
      this.isDropdownHidden = true;
    }
  }

  toggleDropdown() {
    this.isDropdownHidden = !this.isDropdownHidden;
  }

  onSelectHandler(option: IOption) {
    this.currOption = option;

    this.onSelect.emit(option);

    this.toggleDropdown();
  }

  identify(index, option) {
    return option.html;
  }
}
