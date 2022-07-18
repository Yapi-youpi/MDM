import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-switch-input",
  templateUrl: "./switch-input.component.html",
  styleUrls: ["./switch-input.component.scss"],
})
export class SwitchInputComponent {
  @Input() isChecked: boolean = false;

  @Output() onChange = new EventEmitter();

  constructor() {}

  onChangeHandler() {
    this.onChange.emit();
  }
}
