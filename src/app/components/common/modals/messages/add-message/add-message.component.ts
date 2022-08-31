import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  deviceService,
  userService,
  pagerService,
  groupService,
  alertService,
} from '../../../../../shared/services';
import * as states from '../../../../../shared/types/states';
import { Device } from '../../../../../shared/types/devices';
import { DevicesGroup } from '../../../../../shared/types/groups';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.scss'],
})
export class AddMessageComponent implements OnInit {
  public newMsgForm: FormGroup;
  public devices: Device[] = [];
  public groups: DevicesGroup[] = [];

  constructor(
    private user: userService,
    private device: deviceService,
    private pager: pagerService,
    private group: groupService,
    private alert: alertService
  ) {
    this.newMsgForm = new FormGroup({
      dst: new FormControl('', Validators.required),
      target: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.getDevices();
    this.getGroups('all');
  }

  getDevices() {
    this.device
      .get('all')
      .then((res: states.DevicesState) => {
        if (res.success) {
          this.devices = res.devices ? res.devices : [];
        } else {
          this.alert.show({
            title: 'GET DEVICES ERROR',
            content: res.error,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  getGroups(param: string) {
    this.group
      .get(param)
      .then((res: states.DevicesGroupsState) => {
        if (res.success) {
          this.groups = res.devicesGroups ? res.devicesGroups : [];
        } else {
          this.alert.show({
            title: 'GET GROUPS ERROR',
            content: res.error,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  sendMessage() {
    this.pager
      .sendMessage(
        this.newMsgForm.value.target,
        this.newMsgForm.value.text,
        this.newMsgForm.value.dst
      )
      .then((res) => {
        console.log(res);
        this.alert.show({
          type: 'success',
          title: 'УСПЕШНО',
          content: 'Сообщение отправлено',
        });
        this.closeModal();
      })
      .catch((err) => {
        console.log(err);
        this.alert.show({
          title: 'ОШИБКА',
          content: err,
        });
      });
    console.log(this.newMsgForm.value);
  }

  closeModal() {
    this.newMsgForm.reset();
    document.getElementById('modal-add-message')?.classList.add('hidden');
  }
}
