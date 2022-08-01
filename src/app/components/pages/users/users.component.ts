import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Users } from '../../../interfaces/interfaces';
import { interval } from 'rxjs';
import { AssetService } from '../../../services/asset.service';
import Compressor from 'compressorjs';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  public form: FormGroup;
  public filterForm: FormGroup;
  public users: Users[] = [];
  public userTags = [];
  public userRole = '';
  public currentUser: Users | undefined; // undefined is need for reset currentUser
  public search!: string;
  public loaded: boolean = false;
  public filter_roles!: Array<string>;
  public filter_groups!: Array<string>;
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
      userTags: new FormControl(''),
      other: new FormControl(''),
    });
    this.filterForm = fb.group({
      roles: new FormArray([]),
      groups: new FormArray([]),
    });
  }

  ngOnInit() {
    let i = interval(1000).subscribe(() => {
      if (this.userService.token) {
        i.unsubscribe();
        this.getAllUsers();
        this.getUserTags();
        this.asset.getFromStorage('user-role').then((role: string) => {
          this.userRole = role;
        });
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

  deleteUserTag(tag: string) {
    this.userService
      .deleteUserTag(tag)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setCurrentUser(user: Users, edit?: boolean | false) {
    this.currentUser = user;
    // @ts-ignore
    if (edit) {
      this.form.patchValue(user);
      console.log(this.form.value);
    }
  }

  addUser() {
    const avatar = this.userPhoto;
    const login = this.form.get('login')?.value;
    const name = this.form.get('name')?.value;
    const password = this.form.get('password')?.value;
    const role = this.form.get('role')?.value;
    const group =
      this.form.get('userTags')?.value === 'Другое'
        ? [this.form.get('other')?.value]
        : [this.form.get('userTags')?.value];
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
    this.currentUser = undefined;
  }

  sortUsers() {
    this.users.sort((a) => {
      return a.role === 'admin' ? -1 : 1;
    });
    this.users.sort((a) => {
      return a.groupsPermissions.super ? -1 : 1;
    });
    let i = interval(1000).subscribe(() => {
      this.initModals();
      i.unsubscribe();
    });
  }

  editUser() {
    const avatar = this.userPhoto;
    const login = this.form.get('login')?.value;
    const name = this.form.get('name')?.value;
    const password = this.form.get('password')?.value;
    const group =
      this.form.get('userTags')?.value === 'Другое'
        ? [this.form.get('other')?.value]
        : [this.form.get('userTags')?.value];
    if (password)
      this.userService
        .changeUserPassword(login, password)
        .then((res) => {
          console.log(res);
          this.currentUser = undefined;
          this.clearModal();
          this.getAllUsers();
        })
        .catch((err) => {
          console.log(err);
        });
    if (avatar && avatar?.length > 0)
      this.userService
        .loadAvatar(this.currentUser!.id, avatar)
        .then((res) => {
          console.log(res);
          this.currentUser = undefined;
          this.clearModal();
          this.getAllUsers();
        })
        .catch((err) => {
          console.log(err);
        });
    if (group[0][0] !== this.currentUser?.userTags[0])
      this.userService
        .changeUserTag(this.currentUser!.id, group)
        .then((res) => {
          console.log(res);
          this.currentUser = undefined;
          this.clearModal();
          this.getAllUsers();
        })
        .catch((err) => {
          console.log(err);
        });
    if (name !== this.currentUser!.name)
      this.userService
        .renameUSer(login, name)
        .then((res) => {
          console.log(res);
          this.currentUser = undefined;
          this.clearModal();
          this.getAllUsers();
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
        document
          .getElementById('modal-delete-user')
          ?.classList.remove('modal-wrapper--open');
        this.currentUser = undefined;
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

  addFile(event: Event) {
    this.file_input = event.target;
    console.log(this.file_input);
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

  onCheckboxChange(event: any, arr: string) {
    const checkArr = this.filterForm.controls[arr] as FormArray;
    if (event.target.checked) {
      checkArr.push(new FormControl(event.target.value));
    } else {
      const index = checkArr.controls.findIndex(
        (x) => x.value === event.target.value
      );
      checkArr.removeAt(index);
    }
  }

  applyFilter() {
    this.filter_roles = this.filterForm.value.roles;
    this.filter_groups = this.filterForm.value.groups;
  }

  clearFilter() {
    this.filter_roles = [];
    this.filter_groups = [];
    clearCheck('role', this.filterForm);
    clearCheck('group', this.filterForm);

    function clearCheck(arr: string, form: any) {
      const checkboxes = document.querySelectorAll(
        `input[type="checkbox"][name=${arr}]`
      );
      // @ts-ignore
      checkboxes.forEach((checkbox) => (checkbox.checked = false));
      const checkArr = form.controls[arr + 's'] as FormArray;
      const index = checkArr.controls.findIndex((x) => x.value);
      checkArr.removeAt(index);
    }
  }
}

//VhG2NXs3_
