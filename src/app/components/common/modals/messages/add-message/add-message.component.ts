import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { deviceService, userService } from '../../../../../shared/services';
import * as states from '../../../../../shared/types/states';
import { Device } from '../../../../../shared/types/devices';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.scss'],
})
export class AddMessageComponent implements OnInit {
  public newMsgForm: FormGroup;
  public devices: Device[] = [];

  constructor(private user: userService, private device: deviceService) {
    this.newMsgForm = new FormGroup({
      device: new FormControl('', Validators.required),
      target: new FormControl(''),
      text: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.getDevices();
  }

  getDevices() {
    this.device
      .get('all')
      .then((res: states.DevicesState) => {
        if (res.success) {
          this.devices = res.devices ? res.devices : [];
        }
      })
      .catch((err) => console.log(err));
  }

  sendMessage() {
    console.log(this.newMsgForm.value);
  }

  closeModal() {
    document.getElementById('modal-add-message')?.classList.add('hidden');
  }
}
