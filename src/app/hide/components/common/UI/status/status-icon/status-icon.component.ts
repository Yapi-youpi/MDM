import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.scss'],
})
export class StatusIconComponent {
  @Input() size: 's18x18' | 's14x14' = 's14x14';

  @Input() controlState: boolean = false;
  @Input() isOn: boolean = true;
  @Input() isOff: boolean = false;

  constructor() {}
}
