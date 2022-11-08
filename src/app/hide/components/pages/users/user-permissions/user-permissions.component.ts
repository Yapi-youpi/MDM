import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../../../shared/services/asset.service';
import { IGroupPermissions, IPermissions } from '../../../../shared/types';
import { LoaderClass, PermissionsClass } from '../../../../shared/classes';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.css'],
})
export class UserPermissionsComponent implements OnInit {
  public edit: boolean = false;
  public params: IPermissions;
  private initial: IGroupPermissions[] = [];

  constructor(
    public asset: AssetService,
    private permissions: PermissionsClass,
    private _loader: LoaderClass
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
  }

  get loading$() {
    return this._loader.loading$;
  }

  get entity$() {
    return this._loader.entity$;
  }

  get _permissions() {
    return this.permissions.array;
  }

  ngOnInit(): void {
    this.getPermissions();
  }

  getPermissions() {
    this.permissions.get().then((res) => {
      if (res) {
        this.initial = this._permissions;
      }
    });
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  cancelEdit() {
    this.permissions = JSON.parse(JSON.stringify(this.initial));
    this.toggleEdit();
  }

  onCheckboxChange(event: any, role) {
    this.permissions.set(event, role);
  }

  editPermissions() {
    this.permissions.change(this._permissions).then((res) => {
      if (res) this.toggleEdit();
    });
  }
}
