import { Component, Input } from "@angular/core";
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from "@techiediaries/ngx-qrcode";

import { Device } from "../../../../interfaces/devices";

@Component({
  selector: "app-qr-code",
  templateUrl: "./qr-code.component.html",
  styleUrls: ["./qr-code.component.css"],
})
export class QrCodeComponent {
  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  @Input() public device!: Device;

  constructor() {}

  get _qrcode() {
    return JSON.stringify(this.device?.qr_code);
  }
}
