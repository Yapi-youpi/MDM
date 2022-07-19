import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-selected-elements",
  templateUrl: "./selected-elements.component.html",
  styleUrls: ["./selected-elements.component.scss"],
})
export class SelectedElementsComponent {
  @Input() devicesIDs: string[] = [];

  @Output() onCloseClick = new EventEmitter();

  constructor() {}

  onCloseClickHandler() {
    this.onCloseClick.emit();
  }
}
