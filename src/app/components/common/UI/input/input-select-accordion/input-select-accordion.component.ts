import { Component, EventEmitter, Input, Output } from "@angular/core";

import { inputWidth, Option } from "../../../../../shared/types/input";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-input-select-accordion",
  templateUrl: "./input-select-accordion.component.html",
  styleUrls: ["./input-select-accordion.component.scss"],
})
export class InputSelectAccordionComponent {
  @Input() title: string = "";
  @Input() width: inputWidth = "w-170";
  @Input() control: FormControl = new FormControl(null);
  @Input() options: Option[] = [];
  @Input() currOptions: Option[] = [];
  @Input() isError: boolean = false;

  @Output() onSelect = new EventEmitter<Option[]>();

  public isDropdownHidden: boolean = true;
  public copy: Option[] = [];

  constructor() {}

  get _height() {
    return this.isDropdownHidden
      ? 30
      : 30 + 16 + (20 + 10) * this.options.length - 10;
  }

  toggleDropdown() {
    this.isDropdownHidden = !this.isDropdownHidden;
  }

  onOptionSelectHandler(option: Option) {
    if (this.currOptions.length === 0) this.currOptions = this.options;

    if (
      this.currOptions.length === 0 ||
      this.currOptions.filter((o) => o.value === option.value).length === 0
    ) {
      this.currOptions.push({ ...option, isSelected: !option.isSelected });
    } else {
      this.currOptions = this.currOptions.map((o) => {
        if (o.value === option.value) {
          return {
            ...o,
            isSelected: !o.isSelected,
          };
        } else return o;
      });
    }

    this.onSelect.emit(this.currOptions);
  }

  identify(index, option) {
    return option.html;
  }
}
