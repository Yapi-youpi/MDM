import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { IGroup } from '../../../../shared/types/groups';
import { IConfig } from '../../../../shared/types/config';
import { Option } from '../../../../shared/types/input';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss'],
})
export class GroupItemComponent {
  @Input() group!: IGroup;
  @Input() configs!: IConfig[];
  @Input() userRole!: string;

  @Output() onSelectUnselectGroup = new EventEmitter<IGroup>();
  @Output() onFileClick = new EventEmitter<IGroup>();
  @Output() onEditClick = new EventEmitter<IGroup>();
  @Output() onDeleteClick = new EventEmitter<IGroup>();

  @ViewChild('name') nameRef!: ElementRef;
  @ViewChild('tip') tipRef!: ElementRef;

  public currOption: Option = { value: '', html: '' };

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

  get _options() {
    return this.configs.map((c) => {
      return {
        value: c.ID,
        html: c.name,
      } as Option;
    });
  }

  get _currOption() {
    return {
      value: this.group.deviceConfigID,
      html: this.configs.find((c) => c.ID === this.group.deviceConfigID)?.name,
    } as Option;
  }

  onSelectHandler(item: Option) {
    this.currOption = item;
  }

  onSelectUnselectGroupHandler(group: IGroup) {
    this.onSelectUnselectGroup.emit(group);
  }

  onFileClickHandler(group: IGroup) {
    this.onFileClick.emit(group);
  }

  onEditCLickHandler(group: IGroup) {
    this.onEditClick.emit(group);
  }

  onDeleteClickHandler(group: IGroup) {
    this.onDeleteClick.emit(group);
  }
}
