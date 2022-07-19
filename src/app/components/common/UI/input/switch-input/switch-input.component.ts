import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-switch-input",
  templateUrl: "./switch-input.component.html",
  styleUrls: ["./switch-input.component.scss"],
})
export class SwitchInputComponent {
  @Input() control!: FormControl;
  @Input() isChecked: boolean = false;

  @Output() onChange = new EventEmitter();

  constructor() {}

  onChangeHandler() {
    this.onChange.emit();
  }
}
