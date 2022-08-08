import { Component, EventEmitter, Input, Output } from '@angular/core';

import { btnColor, btnText, btnType } from '../../../../../shared/types/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() public text: string = '';
  @Input() public textLike: btnText = 'like-button';
  @Input() public type: btnType = 'button';
  @Input() public height: string = '44.44px';
  @Input() public width: string = 'auto';
  @Input() public padding: string = '12px 16px';
  @Input() public color: btnColor = 'common';
  @Input() public radius: string = '14px';

  @Output() public onCLick = new EventEmitter();

  constructor() {}

  onClickHandler() {
    this.onCLick.emit();
  }
}
