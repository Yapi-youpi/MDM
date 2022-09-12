import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Device, DeviceFile } from '../../../../../shared/types/devices';

@Component({
  selector: 'app-device-files',
  templateUrl: './device-files.component.html',
  styleUrls: ['./device-files.component.scss'],
})
export class DeviceFilesComponent {
  @Input() device!: Device;
  @Input() loading: boolean = false;

  @Output() onDeleteClick = new EventEmitter<DeviceFile>();

  public displayFiles: 'all' | 'import' | 'export' = 'all';

  public searchTerm: string = '';

  public isNameSortAsc: boolean = true;
  public isSizeSortAsc: boolean = true;
  public isDateSortAsc: boolean = true;

  @ViewChild('name') nameRef!: ElementRef;
  @ViewChild('tip') tipRef!: ElementRef;

  constructor() {}

  toggleFilesDisplay(type: typeof this.displayFiles) {
    if (type === this.displayFiles) return;
    else this.displayFiles = type;
  }

  onChangeSearchInputHandler(str: string) {
    this.searchTerm = str;
  }

  changeNameSortDir() {
    this.isNameSortAsc = !this.isNameSortAsc;
  }

  changeSizeSOrtDir() {
    this.isSizeSortAsc = !this.isSizeSortAsc;
  }

  changeDateSortDir() {
    this.isDateSortAsc = !this.isDateSortAsc;
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
    const link = document.createElement('a');
    link.download = file.name;
    link.href = file.url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onDeleteClickHandler(file: DeviceFile) {
    this.onDeleteClick.emit(file);
  }
}
