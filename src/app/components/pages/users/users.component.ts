import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Permissions, Users } from '../../../interfaces/interfaces';
import { interval } from 'rxjs';
import { AssetService } from '../../../services/asset.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  public form: FormGroup;
  public filterForm: FormGroup;
  public users: Users[] = [];
  public currentUser!: Users;
  public login: string = '';
  public loading: boolean = true;
  public changePas: string = '';
  public rename: string = '';
  public search!: string;
  public filter_roles!: Array<string>;
  public params: Permissions;
  public file_input!: any;
  public file_placeholder!: Element;
  public avatar!: Element;
  constructor(
    public asset: AssetService,
    private elementRef: ElementRef,
    public userService: UserService,
    fb: FormBuilder
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      login: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });
    this.filterForm = fb.group({
      roles: new FormArray([]),
    });
    this.params = {
      viewDevices: 'Просмотр устройств',
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

  ngOnInit() {
    let i = interval(1000).subscribe(() => {
      if (this.userService.token) {
        i.unsubscribe();
        this.getAllUsers();
      }
    });
  }

  ngAfterViewInit() {
    this.asset.filterInit('user-filter');
  }

  initModals() {
    this.asset.modalInit('modal-new-user');
    this.asset.modalInit('modal-edit-user');
    this.asset.modalInit('modal-delete-user');
  }

  getAllUsers() {
    this.userService
      .getUserInfo(undefined, 'all')
      .then((res) => {
        console.log(res);
        this.users = res;
        this.loading = false;
        this.sortUsers();
      })
      .then(() => {
        let i = interval(1000).subscribe(() => {
          this.initModals();
          i.unsubscribe();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onCheckboxChange(event: any) {
    const roles = this.filterForm.controls['roles'] as FormArray;
    if (event.target.checked) {
      roles.push(new FormControl(event.target.value));
    } else {
      const index = roles.controls.findIndex(
        (x) => x.value === event.target.value
      );
      roles.removeAt(index);
    }
  }

  applyFilter() {
    console.log(this.filterForm.value.roles);
    this.filter_roles = this.filterForm.value.roles;
  }

  clearFilter() {
    this.filter_roles = [];

    const roles = this.filterForm.controls['roles'] as FormArray;
    const index = roles.controls.findIndex((x) => x.value);
    roles.removeAt(index);
    console.log(this.filterForm.value.roles);
  }

  addUser() {
    const login = this.form.get('login')?.value;
    const name = this.form.get('name')?.value;
    const password = this.form.get('password')?.value;
    const role = this.form.get('role')?.value;
    this.userService
      .addUser(login, password, name, role)
      .then(() => {
        this.userService.getUserInfo(undefined, 'all').then((res) => {
          this.users = res;
          console.log(res);
          this.sortUsers();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteUser(id: string) {
    this.userService
      .deleteUser(id)
      .then((res) => {
        console.log(res);
        this.userService.getUserInfo(undefined, 'all').then((res) => {
          this.users = res;
          this.sortUsers();
        });
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

  sortUsers() {
    this.users.sort((a) => {
      if (a.role === 'admin') {
        return -1;
      } else {
        return 1;
      }
    });
    this.users.sort((a) => {
      if (a.groupsPermissions.super) {
        return -1;
      } else {
        return 1;
      }
    });
  }
  changeState(id: string, state: boolean, index: number) {
    this.users[index].activeState = !state;
    this.userService
      .changeUserState(id, !state)
      .then((res) => {
        if (res) {
          // M.toast({ html: "Успешно" });
        }
      })
      .catch((err) => {
        if (err.error.error === 'api forbidden by user') {
          // M.toast({ html: "Доступ запрещен" });
        }
      });
  }

  getLogin(login: string) {
    this.userService.lowerCase = false;
    this.userService.upperCase = false;
    this.userService.number = false;
    this.userService.specialChar = false;
    this.userService.passLength = 0;
    this.changePas = '';
    this.login = login;
  }

  changeUserPassword(login: string, password: string) {
    this.userService
      .changeUserPassword(login, password)
      .then((res) => {
        // let elem = document.getElementById("changeUserPass");
        // let inst = M.Modal.getInstance(elem);
        // inst.close();
        this.changePas = '';
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renameUser(login: string, name: string) {
    this.userService
      .renameUSer(login, name)
      .then((res) => {
        console.log(res);
        this.getAllUsers();
      })
      .catch((err) => {
        console.log(err);
        // M.toast({ html: err.error.error });
      });
  }
  addFile(event: Event) {
    this.file_input = event.target;
    const file = this.file_input.files[0];
    if (file) {
      this.file_placeholder = this.elementRef.nativeElement.querySelector(
        '.avatar__attachment'
      );
      console.log(file);
      this.file_placeholder.innerHTML = `<span>${file.name}</span><button type="button" class="btn btn--outline btn--action clear-file-btn"><i class="tiny material-icons">clear</i></button>`;
      this.avatar =
        this.elementRef.nativeElement.querySelector('.avatar__image');
      this.avatar.setAttribute(
        'style',
        `background-image: url(${window.URL.createObjectURL(
          file
        )}); background-size: cover;`
      );
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = reader.result
          ?.toString()
          .replace(/^data:image\/[a-z]+;base64,/, '');
        //console.log(img);
      };
      /*      this.inputForm.get('file')?.patchValue({
        file: files[0],
      });*/
      // this.inputForm.get('file')?.updateValueAndValidity();
      document
        .querySelector('.clear-file-btn')!
        .addEventListener('click', () => {
          this.clearInputFile(
            this.file_input,
            this.file_placeholder,
            this.avatar
          );
        });
    }
  }
  clearInputFile(
    input: HTMLInputElement,
    placeholder: Element,
    image: Element
  ) {
    if (input && placeholder) {
      let btn = document.querySelector('.clear-file-btn');
      if (btn !== null) {
        btn.removeEventListener('click', () => this.clearInputFile);
      }
      input.value = '';
      placeholder.innerHTML = '';
      image.removeAttribute('style');
      // this.inputForm.patchValue({ file: null });
    }
  }
}
//VhG2NXs3_
