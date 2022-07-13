import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-selected-devices",
  templateUrl: "./selected-devices.component.html",
  styleUrls: ["./selected-devices.component.css"],
})
export class SelectedDevicesComponent {
  @Input() devicesIDs: string[] = [];

  @Output() onCloseClick = new EventEmitter();

  constructor() {}

  onCloseClickHandler() {
    this.onCloseClick.emit();
  }
}
