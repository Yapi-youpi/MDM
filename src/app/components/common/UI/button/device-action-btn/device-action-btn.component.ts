import { Component, Input } from "@angular/core";

@Component({
  selector: "app-device-action-btn",
  templateUrl: "./device-action-btn.component.html",
  styleUrls: ["./device-action-btn.component.scss"],
})
export class DeviceActionBtnComponent {
  @Input() target: string = "";

  constructor() {}

  onClickHandler() {
    const modal = document.querySelector(`#${this.target}`);
    modal?.classList.toggle("hidden");
  }
}
