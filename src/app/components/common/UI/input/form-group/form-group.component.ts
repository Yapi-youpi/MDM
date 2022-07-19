import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

import {
  inputType,
  inputWidth,
  Option,
} from "../../../../../shared/types/input";

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

  @Input() options: Option[] = [];
  @Input() isMultiselect: boolean = false;

  constructor() {}
}
