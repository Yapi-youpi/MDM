import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { DevicesConfig } from '../../../../shared/types/config';
import { IGroup } from '../../../../shared/types/groups';
import { IDevice } from '../../../../shared/types/devices';

@Component({
  selector: 'app-device-item',
  templateUrl: './device-item.component.html',
  styleUrls: ['./device-item.component.scss'],
})
export class DeviceItemComponent {
  @Input() public device!: IDevice;
  @Input() public configs!: DevicesConfig[];
  @Input() public groups!: IGroup[];
  @Input() userRole!: string;

  @Output() onSelectUnselectDevice = new EventEmitter<IDevice>();
  @Output() onChangeDeviceState = new EventEmitter<IDevice>();
  @Output() onClickDeviceQRCode = new EventEmitter<IDevice>();
  @Output() onClickDeviceEdit = new EventEmitter<IDevice>();
  @Output() onClickDeviceDelete = new EventEmitter<IDevice>();
  @Output() onClickDeviceReboot = new EventEmitter<IDevice>();
  @Output() onClickDeviceFiles = new EventEmitter<IDevice>();

  @ViewChild('name') nameRef!: ElementRef;
  @ViewChild('tip') tipRef!: ElementRef;

  displayTip() {
    if (
      this.nameRef.nativeElement.offsetWidth <
      this.nameRef.nativeElement.scrollWidth
    ) {
      this.tipRef.nativeElement.style.visibility = 'visible';
      this.tipRef.nativeElement.style.opacity = 1;
    }
  }
  hideTip() {
    this.tipRef.nativeElement.style.visibility = 'hidden';
    this.tipRef.nativeElement.style.opacity = 0;
  }

  onSelectUnselectDeviceHandler(device: IDevice) {
    this.onSelectUnselectDevice.emit(device);
  }

  onChangeDeviceStateHandler(device: IDevice) {
    this.onChangeDeviceState.emit(device);
  }

  onClickDeviceQRCodeHandler(device: IDevice) {
    this.onClickDeviceQRCode.emit(device);
  }

  onClickDeviceEditHandler(device: IDevice) {
    this.onClickDeviceEdit.emit(device);
  }

  onClickDeviceDeleteHandler(device: IDevice) {
    this.onClickDeviceDelete.emit(device);
  }

  onClickDeviceReloadHandler(device: IDevice) {
    this.onClickDeviceReboot.emit(device);
  }

  onClickDeviceFilesHandler(device: IDevice) {
    this.onClickDeviceFiles.emit(device);
  }
}
