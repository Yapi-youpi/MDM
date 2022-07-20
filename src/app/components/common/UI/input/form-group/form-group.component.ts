import { Component, Input } from "@angular/core";

import { inputType, inputWidth } from "../../../../../shared/types/input";
import { AbstractControl, FormControl } from "@angular/forms";

@Component({
  selector: "app-form-group",
  templateUrl: "./form-group.component.html",
  styleUrls: ["./form-group.component.scss"],
})
export class FormGroupComponent {
  @Input() name: string = "";
  @Input() inputType: inputType = "text";
  @Input() inputWidth: inputWidth = "w-170";
  @Input() labelText: string = "";
  @Input() control: FormControl = new FormControl(null);
  @Input() isError: boolean = false;

  constructor() {}
}
