import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
})
export class CheckboxComponent {
  @Input() isChecked: boolean = false;

  @Output() onChange = new EventEmitter();

  constructor() {}

  onChangeHandler() {
    this.onChange.emit();
  }
}
