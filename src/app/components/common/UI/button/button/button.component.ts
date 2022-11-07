import { Component, EventEmitter, Input, Output } from '@angular/core';

import { btnColor, btnText, btnType } from '../../../../../shared/types';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() textLike: btnText = 'like-button';
  @Input() type: btnType = 'button';
  @Input() height: string = '44.44px';
  @Input() width: string = 'auto';
  @Input() padding: string = '12px 16px';
  @Input() color: btnColor = 'common';
  @Input() radius: string = '14px';
  @Input() disabled: boolean = false;

  @Output() public onCLick = new EventEmitter();

  constructor() {}

  onClickHandler() {
    this.onCLick.emit();
  }
}
