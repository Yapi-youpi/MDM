import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditDeviceService } from '../../../../../../shared/services/forms/device/edit-device.service';
import { App } from '../../../../../../shared/types/apps';

@Component({
  selector: 'app-app-action-btn',
  templateUrl: './app-action-btn.component.html',
  styleUrls: ['./app-action-btn.component.scss'],
})
export class AppActionBtnComponent {
  @Input() target: string = '';
  @Input() app!: App;
  @Input() text!: string;

  @Output() onClick = new EventEmitter<App>();

  constructor(private form: EditDeviceService) {
  }

  onClickHandler(app: App) {
    this.onClick.emit(app);
    const modal = document.querySelector(`#${this.target}`);
    modal?.classList.toggle('hidden');
  }
}
