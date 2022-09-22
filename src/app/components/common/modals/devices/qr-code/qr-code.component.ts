import { Component, Input } from '@angular/core';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';

import { Device } from '../../../../../shared/types/devices';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent {
  @Input() public device!: Device;

  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  public isTipHidden: boolean = true;

  constructor() {}

  onHelpClickHandler() {
    this.isTipHidden = !this.isTipHidden;
  }

  onCancelHandler() {
    this.isTipHidden = true;

    const modal = document.querySelector('#qr_code');
    modal?.classList.toggle('hidden');
  }
}
