import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
})
export class CheckboxComponent {
  @Input() control!: FormControl;
  @Input() isChecked: boolean = false;

  @Output() onChange = new EventEmitter();

  constructor() {}

  onChangeHandler() {
    this.onChange.emit();
  }
}
