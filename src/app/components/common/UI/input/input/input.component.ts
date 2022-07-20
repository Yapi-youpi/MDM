import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@angular/forms";

import {
  inputType,
  inputWidth,
  Option,
} from "../../../../../shared/types/input";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
})
export class InputComponent {
  @Input() name: string = "";
  @Input() type: inputType = "text";
  @Input() width: inputWidth = "w-170";
  @Input() control: FormControl = new FormControl(null);
  @Input() isError: boolean = false;

  @Input() options: Option[] = [];
  @Input() currOption!: Option;
  @Input() isMultiselect: boolean = false;

  @Input() isSwitchChecked: boolean = false;

  @Output() onSelect = new EventEmitter<Option>();

  public isPasswordVisible: boolean = false;

  constructor() {}

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSelectHandler(item: Option) {
    this.onSelect.emit(item);
  }
}
