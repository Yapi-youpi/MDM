import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { DevicesGroup } from '../../../../shared/types/groups';
import { DevicesConfig } from '../../../../shared/types/config';
import { Option } from '../../../../shared/types/input';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss'],
})
export class GroupItemComponent {
  @Input() group!: DevicesGroup;
  @Input() configs!: DevicesConfig[];
  @Input() userRole!: string;

  @Output() onSelectUnselectGroup = new EventEmitter<DevicesGroup>();
  @Output() onConfigChange = new EventEmitter<{
    group: DevicesGroup;
    deviceConfigID: string;
  }>();
  @Output() onSwitchChange = new EventEmitter<DevicesGroup>();
  @Output() onFileClick = new EventEmitter<DevicesGroup>();
  @Output() onEditClick = new EventEmitter<DevicesGroup>();
  @Output() onDeleteClick = new EventEmitter<DevicesGroup>();

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
    this.onConfigChange.emit({ group: this.group, deviceConfigID: item.value });
  }

  onSelectUnselectGroupHandler(group: DevicesGroup) {
    this.onSelectUnselectGroup.emit(group);
  }

  onSwitchChangeHandler(group: DevicesGroup) {
    this.onSwitchChange.emit(group);
  }

  onFileClickHandler(group: DevicesGroup) {
    this.onFileClick.emit(group);
  }

  onEditCLickHandler(group: DevicesGroup) {
    this.onEditClick.emit(group);
  }

  onDeleteClickHandler(group: DevicesGroup) {
    this.onDeleteClick.emit(group);
  }
}
