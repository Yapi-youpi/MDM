import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-input-alert",
  templateUrl: "./input-alert.component.html",
  styleUrls: ["./input-alert.component.scss"],
})
export class InputAlertComponent {
  @Input() control: FormControl = new FormControl(null);
  @Input() type: "success" | "error" = "error";
  @Input() message!: string;

  constructor() {}
}
