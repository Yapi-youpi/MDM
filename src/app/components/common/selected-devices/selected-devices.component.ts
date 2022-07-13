import { Component, EventEmitter, Input, Output } from "@angular/core";

import { Device } from "../../../shared/interfaces/devices";

@Component({
  selector: "app-selected-devices",
  templateUrl: "./selected-devices.component.html",
  styleUrls: ["./selected-devices.component.css"],
})
export class SelectedDevicesComponent {
  @Input() devices!: Device[];

  @Output() onCloseClick = new EventEmitter();
  @Output() onEditClick = new EventEmitter();
  @Output() onDeleteClick = new EventEmitter();

  constructor() {}

  onCloseClickHandler() {
    this.onCloseClick.emit();
  }

  onEditClickHandler() {
    this.onEditClick.emit();
  }

  onDeleteClickHandler() {
    this.onDeleteClick.emit();
  }
}
