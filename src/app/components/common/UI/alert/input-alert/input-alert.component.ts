import { Component, Input } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Component({
  selector: "app-input-alert",
  templateUrl: "./input-alert.component.html",
  styleUrls: ["./input-alert.component.css"],
})
export class InputAlertComponent {
  @Input() inputControl!: AbstractControl;

  constructor() {}
}
