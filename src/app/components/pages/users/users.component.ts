import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  GroupPermissions,
  Permissions,
  Users,
} from '../../../interfaces/interfaces';
import { interval } from 'rxjs';
import { AssetService } from '../../../services/asset.service';
import Compressor from 'compressorjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  public form: FormGroup;
  public filterForm: FormGroup;
  public permissionsForm: FormGroup;
  public permissions: GroupPermissions[] = [];
  public users: Users[] = [];
  public userTags = [];
  public currentUser!: Users;
  public search!: string;
  public loaded: boolean = false;
  public edit: boolean = false;
  public params: Permissions;
  public filter_roles!: Array<string>;
  public file_input!: any;
  public file_placeholder!: Element;
  public avatar!: Element;
  public userPhoto!: string;
  constructor(
    public asset: AssetService,
    private elementRef: ElementRef,
    public userService: UserService,
    private fb: FormBuilder
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      login: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      group: new FormControl(''),
      other: new FormControl(''),
    });
    this.filterForm = fb.group({
      roles: new FormArray([]),
    });
    this.permissionsForm = fb.group({
      permissions: new FormArray([]),
    });
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

  ngOnInit() {
    let i = interval(1000).subscribe(() => {
      if (this.userService.token) {
        i.unsubscribe();
        this.getAllUsers();
        this.getPermissions();
        this.getUserTags();
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

  getAllUsers() {
    this.userService
      .getUserInfo(undefined, 'all')
      .then((res) => {
        console.log(res);
        this.users = res;
        this.users.forEach((user) => {
          if (
            user.avatar.length > 0 &&
            !user.avatar.includes('data:image/jpeg;base64,')
          )
            user.avatar = 'data:image/jpeg;base64,' + user.avatar;
        });
        this.sortUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserTags() {
    this.userService
      .getUserTags()
      .then((res) => {
        console.log(res);
        this.userTags = res.userTags;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setCurrentUser(user: Users) {
    this.currentUser = user;
  }

  addUser() {
    const avatar = this.userPhoto;
    const login = this.form.get('login')?.value;
    const name = this.form.get('name')?.value;
    const password = this.form.get('password')?.value;
    const role = this.form.get('role')?.value;
    const group =
      this.form.get('group')?.value === 'Другое'
        ? [this.form.get('other')?.value]
        : [this.form.get('group')?.value];
    this.userService
      .addUser(avatar, login, password, name, role, group)
      .then(() => {
        this.clearModal();
        this.getAllUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  clearModal() {
    this.form.reset();
    document
      .getElementById('modal-new-user')
      ?.classList.remove('modal-wrapper--open');
  }

  sortUsers() {
    this.users.sort((a, b) => {
      if (a.groupsPermissions.super) return -1;
      if (a.role < b.role) return -1;
      if (a.role > b.role) return 1;
      return 0;
    });
    let i = interval(1000).subscribe(() => {
      this.initModals();
      i.unsubscribe();
    });
  }

  editUser() {
    console.log('user data will update');
  }

  deleteUser(id: string) {
    this.userService
      .deleteUser(id)
      .then((res) => {
        console.log(res);
        document
          .getElementById('modal-delete-user')
          ?.classList.remove('modal-wrapper--open');
        this.getAllUsers();
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

  changeUserPassword(login: string, password: string) {
    this.userService
      .changeUserPassword(login, password)
      .then((res) => {
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
      });
  }

  addFile(event: Event) {
    this.file_input = event.target;
    const file = this.file_input.files[0];
    if (file) {
      this.file_placeholder = this.elementRef.nativeElement.querySelector(
        '.avatar__attachment'
      );
      new Compressor(file, {
        quality: 0.6,
        maxWidth: 512,
        maxHeight: 512,

        success(res) {
          convertTo64(res);
        },
        error(err) {
          console.log(err.message);
        },
      });
      this.file_placeholder.innerHTML = `<span>${file.name}</span><button type="button" class="btn btn--outline btn--action clear-file-btn"><i class="tiny material-icons">clear</i></button>`;
      this.avatar =
        this.elementRef.nativeElement.querySelector('.avatar__image');
      this.avatar.setAttribute(
        'style',
        `background-image: url(${window.URL.createObjectURL(
          file
        )}); background-size: cover;`
      );
      const convertTo64 = (img) => {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = () => {
          const img = reader.result
            ?.toString()
            .replace(/^data:image\/[a-z]+;base64,/, '');
          this.userPhoto = img || '';
        };
      };
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
    }
  }

  toggleEdit() {
    this.edit = !this.edit;
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
    this.filter_roles = this.filterForm.value.roles;
  }

  clearFilter() {
    this.filter_roles = [];
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"][name="role"]'
    );
    // @ts-ignore
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
    const roles = this.filterForm.controls['roles'] as FormArray;
    const index = roles.controls.findIndex((x) => x.value);
    roles.removeAt(index);
  }
}

//VhG2NXs3_
