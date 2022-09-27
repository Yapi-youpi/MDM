import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IFile } from '../../../../shared/types/files';
import { FileClass } from '../../../../shared/classes/files/file.class';

@Component({
  selector: 'app-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss'],
})
export class FileItemComponent {
  @Input() file!: IFile;

  @Output() onFileClick = new EventEmitter<IFile>();
  @Output() onDownloadClick = new EventEmitter<IFile>();
  @Output() onDeleteClick = new EventEmitter<IFile>();

  @ViewChild('name') nameRef!: ElementRef;
  @ViewChild('tip') tipRef!: ElementRef;

  constructor(private files: FileClass) {}

  get _curFile() {
    return this.files.current;
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

  onFileClickHandler(file: IFile) {
    this.onFileClick.emit(file);
  }

  onDownloadClickHandler(file: IFile) {
    this.onDownloadClick.emit(file);
  }

  onDeleteClickHandler(file: IFile) {
    this.onDeleteClick.emit(file);
  }
}
