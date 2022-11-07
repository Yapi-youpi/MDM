import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { IFile } from '../../../../../shared/types';
import {
  DeviceClass,
  FileClass,
  LoaderClass,
} from '../../../../../shared/classes';
import { GroupClass } from '../../../../../shared/classes/groups/group.class';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.scss'],
})
export class ListFilesComponent {
  @Input() source: 'device' | 'group' = 'device';

  public displayFiles: 'all' | 'import' | 'export' = 'all';
  private imagesEXT: string[] = ['ico', 'jpg', 'jpeg', 'png', 'gif', 'svg'];
  private videoEXT: string[] = ['mp4', 'webm', 'ogg'];

  public searchTerm: string = '';

  public isNameSortAsc: boolean = true;
  public isSizeSortAsc: boolean = true;
  public isDateSortAsc: boolean = true;

  @ViewChild('name') nameRef!: ElementRef;
  @ViewChild('tip') tipRef!: ElementRef;

  constructor(
    private device: DeviceClass,
    private groups: GroupClass,
    private files: FileClass,
    private _loader: LoaderClass
  ) {}

  get loading$() {
    return this._loader.loading$;
  }

  get entity$() {
    return this._loader.entity$;
  }

  get _group() {
    return this.groups.current;
  }

  get _device() {
    return this.device.current;
  }

  get _file() {
    return this.files.current;
  }

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

  setCurrentFile(file: IFile) {
    this.files.setCurrent(file);
  }

  fileType(fileURL: string): 'img' | 'video' | 'other' | 'none' {
    if (!fileURL || fileURL.length === 0) return 'none';
    else {
      const fType = fileURL.split('.');
      const ext = fType[fType.length - 1];

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
      if (this._file) this.files.setCurrent(null);
    }
  }
}
