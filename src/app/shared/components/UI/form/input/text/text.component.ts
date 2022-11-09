import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent {
  @Input() control!: FormControl;
  @Input() placeholder: string = '';
  @Input() isError: boolean = false;
  @Input() width: string = 'auto';

  constructor() {}
}
