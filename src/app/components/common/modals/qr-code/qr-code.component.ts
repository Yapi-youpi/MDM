import { Component, Input } from "@angular/core";
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from "@techiediaries/ngx-qrcode";

import { Device } from "../../../../shared/interfaces/devices";

@Component({
  selector: "app-qr-code",
  templateUrl: "./qr-code.component.html",
  styleUrls: ["./qr-code.component.css"],
})
export class QrCodeComponent {
  @Input() public device!: Device;

  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  public isTipHidden: boolean = true;

  constructor() {}

  get _qrcode() {
    return JSON.stringify(this.device?.qr_code);
  }

  onHelpClickHandler() {
    this.isTipHidden = !this.isTipHidden;
  }

  onCloseClickHandler() {
    this.isTipHidden = true;
  }
}
