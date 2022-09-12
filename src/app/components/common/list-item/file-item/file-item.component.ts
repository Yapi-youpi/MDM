import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { DeviceFile } from '../../../../shared/types/devices';

@Component({
  selector: 'app-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss'],
})
export class FileItemComponent {
  @Input() file!: DeviceFile;
  @Input() currFile: DeviceFile | null = null;

  @Output() onFileClick = new EventEmitter<DeviceFile>();
  @Output() onDownloadClick = new EventEmitter<DeviceFile>();
  @Output() onDeleteClick = new EventEmitter<DeviceFile>();

  @ViewChild('name') nameRef!: ElementRef;
  @ViewChild('tip') tipRef!: ElementRef;

  constructor() {}

  onFileClickHandler(file: DeviceFile) {
    this.onFileClick.emit(file);
  }

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

  onDownloadClickHandler(file: DeviceFile) {
    this.onDownloadClick.emit(file);
  }

  onDeleteClickHandler(file: DeviceFile) {
    this.onDeleteClick.emit(file);
  }
}
