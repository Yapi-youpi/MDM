import { Component } from '@angular/core';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';
import { DeviceClass } from '../../../../../shared/classes/devices/device.class';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent {
  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  public isTipHidden: boolean = true;

  constructor(private device: DeviceClass) {}

  get _device() {
    return this.device.current;
  }

  onHelpClickHandler() {
    this.isTipHidden = !this.isTipHidden;
  }

  onCancelHandler() {
    this.isTipHidden = true;

    const modal = document.querySelector('#qr_code');
    modal?.classList.toggle('hidden');
  }
}
