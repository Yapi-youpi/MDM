import { Component, EventEmitter, Output } from '@angular/core';
import { UsersClass } from '../../../../../shared/classes/users/users.class';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent {
  @Output() onClose = new EventEmitter<boolean>();

  constructor(private users: UsersClass) {}

  get _current() {
    return this.users.current;
  }

  deleteUser(id: string) {
    this.users.delete(id).then((res) => {
      if (res) this.closeModal(true);
    });
  }

  closeModal(changes?: boolean) {
    document.getElementById('modal-delete-user')?.classList.add('hidden');
    this.users.setCurrent();
    this.onClose.emit(changes);
  }
}
