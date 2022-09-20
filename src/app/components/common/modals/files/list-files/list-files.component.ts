import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Device } from '../../../../../shared/types/devices';
import { IFile } from '../../../../../shared/types/files';
import { DevicesGroup } from '../../../../../shared/types/groups';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.scss'],
})
export class ListFilesComponent {
  @Input() source: 'device' | 'group' = 'device';
  @Input() device!: Device;
  @Input() group!: DevicesGroup;
  @Input() loading: boolean = false;

  @Output() onDeleteClick = new EventEmitter<IFile>();

  public displayFiles: 'all' | 'import' | 'export' = 'all';
  private imagesEXT: string[] = ['ico', 'jpg', 'jpeg', 'png', 'gif', 'svg'];
  private videoEXT: string[] = ['mp4', 'webm', 'ogg'];

  public searchTerm: string = '';

  public isNameSortAsc: boolean = true;
  public isSizeSortAsc: boolean = true;
  public isDateSortAsc: boolean = true;

  public currFile: IFile | null = null;

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

  onDownloadClickHandler(file: IFile) {
    const link = document.createElement('a');
    link.download = file.name;
    link.href = file.url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onDeleteClickHandler(file: IFile) {
    this.onDeleteClick.emit(file);
  }

  setCurrentFile(file: IFile) {
    this.currFile = file;
  }

  fileType(fileURL: string): 'img' | 'video' | 'other' | 'none' {
    if (!fileURL || fileURL.length === 0) return 'none';
    else {
      const fType = fileURL.split('.');
      const ext = fType[fType.length - 1];
      // return this.imagesEXT.includes(ext);
      if (this.imagesEXT.includes(ext)) return 'img';
      if (this.videoEXT.includes(ext)) return 'video';
      return 'other';
    }
  }

  @HostListener('mousedown', ['$event'])
  resetCurrFile(event) {
    if (
      !event.target.classList.contains('list-item') &&
      !event.target.classList.contains('name-wrapper') &&
      !event.target.classList.contains('name') &&
      !event.target.classList.contains('list-tip') &&
      !event.target.classList.contains('name-wrapper') &&
      !event.target.classList.contains('size') &&
      !event.target.classList.contains('date') &&
      !event.target.classList.contains('action-btns') &&
      !event.target.classList.contains('download') &&
      !event.target.classList.contains('delete') &&
      !event.target.classList.contains('button') &&
      !event.target.classList.contains('icon') &&
      !event.target.classList.contains('preview') &&
      !event.target.classList.contains('text-choose') &&
      !event.target.classList.contains('video') &&
      !event.target.classList.contains('img')
    ) {
      if (this.currFile) this.currFile = null;
    }
  }
}
