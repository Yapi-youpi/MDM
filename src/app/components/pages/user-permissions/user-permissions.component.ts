import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../../services/asset.service';
import { GroupPermissions, Permissions } from '../../../interfaces/interfaces';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { interval } from 'rxjs';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.css'],
})
export class UserPermissionsComponent implements OnInit {
  public loaded: boolean = false;
  public edit: boolean = false;
  public params: Permissions;
  public permissionsForm: FormGroup;
  public permissions: GroupPermissions[] = [];
  constructor(
    public asset: AssetService,
    public userService: UserService,
    private fb: FormBuilder
  ) {
    this.params = {
      viewDevices: 'Просмотр устройств',
      viewUsers: 'Просмотр пользователей',
      applicationsAdd: 'Добавление приложений',
      createEditConfig: 'Добавление и редактирование конфигураций',
      createEditDevice: 'Добавление и редактирование устройств',
      createEditDeviceGroups: 'Добавление и редактирование групп устройств',
      changeSelfPassword: 'Изменение своего пароля',
      changeOperatorPassword: 'Изменение пароля оператора',
      operatorActivateDeactivate: 'Изменение активности операторов',
      operatorAdd: 'Добавление операторов',
      deleteOperators: 'Удаление операторов',
      sendInfoMessages: 'Отправка сообщений',
    };
    this.permissionsForm = fb.group({
      permissions: new FormArray([]),
    });
  }

  ngOnInit(): void {
    let i = interval(1000).subscribe(() => {
      if (this.userService.token) {
        i.unsubscribe();
        this.getPermissions();
      }
    });
  }

  getPermissions() {
    this.userService
      .getPermissions()
      .then((res) => {
        this.permissions = res;
        this.loaded = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggleEdit() {
    this.edit = !this.edit;
  }
}
