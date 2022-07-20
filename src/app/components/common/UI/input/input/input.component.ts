import { Component, Input } from "@angular/core";

import { inputType, inputWidth } from "../../../../../shared/types/input";
import { AbstractControl, FormControl } from "@angular/forms";

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

  public isPasswordVisible: boolean = false;

  constructor() {}

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
