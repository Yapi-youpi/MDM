import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordComponent {
  @Input() control!: FormControl;
  @Input() placeholder: string = '';
  @Input() isError: boolean = false;
  @Input() width: string = 'auto';

  public isVisible: boolean = false;

  constructor() {}

  onVisibilityBtnClickHandler() {
    this.isVisible = !this.isVisible;
  }
}
