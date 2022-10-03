import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../../../shared/services/user.service';
import { IUser } from '../../../../../shared/types/users';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {
  @Input() currentUser: IUser | undefined;
  constructor(private userService: UserService) {}
  @Output() onClose = new EventEmitter<boolean>();
  ngOnInit(): void {}

  deleteUser(id: string) {
    this.userService
      .delete(id)
      .then((res) => {
        console.log(res);
        this.closeModal(true);
      })
      .catch((err) => {
        if (err.error.error === 'super admin never die') {
          // M.toast({ html: "Пользователя нельзя удалить" });
        }
        if (err.error.error === 'api forbidden by user, only for super admin') {
          // M.toast({ html: "Доступ запрещен" });
        }
      });
  }

  closeModal(changes?: boolean) {
    document.getElementById('modal-delete-user')?.classList.add('hidden');
    this.currentUser = undefined;
    this.onClose.emit(changes);
  }
}
