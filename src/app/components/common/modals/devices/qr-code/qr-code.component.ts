import { Component } from '@angular/core';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';
import { DeviceClass } from '../../../../../shared/classes';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent {
  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.LOW;
  public isTipHidden: boolean = true;

  constructor(private _device: DeviceClass) {}

  get device() {
    return this._device.current;
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
