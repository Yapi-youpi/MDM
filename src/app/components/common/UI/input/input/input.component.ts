import { Component, Input } from "@angular/core";
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
  @Input() isMultiselect: boolean = false;

  @Input() isSwitchChecked: boolean = false;

  // @Output() onSwitchChange = new EventEmitter();

  public isPasswordVisible: boolean = false;

  constructor() {}

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // onSwitchChangeHandler() {
  //   this.onSwitchChange.emit();
  // }
}
