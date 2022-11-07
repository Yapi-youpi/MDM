import { Component } from '@angular/core';
import { userService } from '../../../../../shared/services';
import { PagerClass } from '../../../../../shared/classes/pager/pager.class';
import { DeviceClass } from '../../../../../shared/classes/devices/device.class';
import { GroupClass } from '../../../../../shared/classes/groups/group.class';
import { add } from '../../../../../shared/services/forms/messages';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.scss'],
})
export class AddMessageComponent {
  constructor(
    private user: userService,
    private pager: PagerClass,
    private device: DeviceClass,
    private group: GroupClass,
    private form: add
  ) {}

  get _form() {
    return this.form.form;
  }

  get _dst() {
    return this._form.get('dst');
  }

  get _devices() {
    return this.device.array;
  }

  get _groups() {
    return this.group.array;
  }

  sendMessage() {
    if (this.form.values) {
      this.pager
        .send(
          this.form.values.target,
          this.form.values.text,
          this.form.values.dst
        )
        .then((res) => {
          if (res) {
            this.pager.get().then();
            this.closeModal();
          }
        });
    }
  }

  closeModal() {
    const modal = document.querySelector('#modal-add-message');
    if (!modal?.classList.contains('hidden')) modal?.classList.toggle('hidden');
  }
}
