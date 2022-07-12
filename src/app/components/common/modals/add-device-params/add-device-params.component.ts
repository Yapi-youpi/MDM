import { Component, Input } from "@angular/core";

@Component({
  selector: "app-add-device-params",
  templateUrl: "./add-device-params.component.html",
  styleUrls: ["./add-device-params.component.css"],
})
export class AddDeviceParamsComponent {
  @Input() public name: string = "";

  constructor() {}
}
