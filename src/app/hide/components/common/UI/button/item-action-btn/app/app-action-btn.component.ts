import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditDeviceService } from '../../../../../../shared/services/forms/device/edit-device.service';
import { IApp } from '../../../../../../shared/types';

@Component({
  selector: 'app-app-action-btn',
  templateUrl: './app-action-btn.component.html',
  styleUrls: ['./app-action-btn.component.scss'],
})
export class AppActionBtnComponent {
  @Input() target: string = '';
  @Input() app!: IApp;
@Input() text!: string
  @Output() onClick = new EventEmitter<IApp>();

  constructor(private form: EditDeviceService) {}

  onClickHandler(app: IApp) {
    this.onClick.emit(app);
    const modal = document.querySelector(`#${this.target}`);
    modal?.classList.toggle('hidden');
  }
}
