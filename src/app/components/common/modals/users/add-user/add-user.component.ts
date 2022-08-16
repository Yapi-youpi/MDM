import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Users } from '../../../../../interfaces/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../../shared/services/user.service';
import Compressor from 'compressorjs';
import { interval } from 'rxjs';
import { AssetService } from '../../../../../shared/services/asset.service';
import { alertService } from '../../../../../shared/services';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  @Input() currentUser: Users | undefined;
  public userRole = '';
  public userLogin = '';
  public form: FormGroup;
  public userTags = [];
  public file_input!: any;
  public file_placeholder!: Element;
  public avatar!: Element;
  public userPhoto!: string;
  public passwordField: boolean = true;
  public isEditSelf: boolean = false;
  public pattern =
    "^(?=.*\\d)(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*[~'`!@#№?$%^&*()=+<>|\\\\\\/_.,:;\\[\\]{} \x22-]).{8,64}$";
  @Output() onClose = new EventEmitter<boolean>();
  constructor(
    private asset: AssetService,
    private alert: alertService,
    private elementRef: ElementRef,
    private userService: UserService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      oldPassword: new FormControl(''),
      password: new FormControl('', Validators.required),
      login: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      userTags: new FormControl(''),
      other: new FormControl(''),
    });
  }

  ngOnChanges() {
    if (this.currentUser) {
      this.form.patchValue(this.currentUser);
      this.currentUser.login === this.userLogin
        ? (this.isEditSelf = true)
        : (this.isEditSelf = false);
      this.passwordField = false;
    } else {
      this.form.reset();
      this.isEditSelf = false;
      this.passwordField = true;
    }
  }

  ngOnInit() {
    let i = interval(200).subscribe(() => {
      this.asset.getFromStorage('login').then((login) => {
        this.userLogin = login;
        if (this.currentUser?.login === this.userLogin) this.isEditSelf = true;
      });
      this.asset.getFromStorage('user-role').then((role: string) => {
        this.userRole = role;
        if (role === 'super' || role === 'admin') {
          this.getUserTags();
        }
      });
      i.unsubscribe();
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
        this.clearModal(true);
        this.showAlert('Пользователь добавлен');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showPasswordField() {
    this.passwordField = true;
    let t = interval(20).subscribe(() => {
      this.isEditSelf
        ? document.getElementById('old-pass')?.focus()
        : document.getElementById('password')?.focus();
      t.unsubscribe();
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

    if (password) {
      if (this.isEditSelf) {
        const lastPassword = this.form.get('oldPassword')?.value;
        this.userService
          .changePassword(lastPassword, password)
          .then(() => {
            document.getElementById('old-pass')?.removeAttribute('style');
            this.clearModal(true);
            this.showAlert('Пароль изменен');
          })
          .catch((err) => {
            console.log(err);
            if (err.error.error === 'wrong password or login') {
              document
                .getElementById('old-pass')
                ?.setAttribute('style', 'outline: 2px solid #eb4f4f;');
            }
          });
      } else {
        this.userService
          .changeUserPassword(login, password)
          .then(() => {
            this.currentUser = undefined;
            this.clearModal(true);
            this.showAlert('Пароль изменен');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    if (avatar && avatar?.length > 0) {
      this.userService
        .loadAvatar(this.currentUser!.id, avatar)
        .then((res) => {
          console.log(res);
          this.currentUser = undefined;
          this.clearModal(true);
          this.showAlert('Аватар обновлен');
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (group[0][0] !== this.currentUser?.userTags[0]) {
      this.userService
        .changeUserTag(this.currentUser!.id, group)
        .then((res) => {
          console.log(res);
          this.currentUser = undefined;
          this.clearModal(true);
          this.showAlert('Подразделение обновлено');
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (name !== this.currentUser!.name) {
      this.userService
        .renameUSer(login, name)
        .then((res) => {
          console.log(res);
          this.currentUser = undefined;
          this.clearModal(true);
          this.showAlert('Имя изменено');
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

  showValidation() {
    document.querySelector('.validation-list')?.classList.remove('hidden');
  }

  hideValidation() {
    document.querySelector('.validation-list')?.classList.add('hidden');
  }

  validate() {
    this.form.get('password')?.value.length >= 8
      ? document
          .querySelector('.validation-item[data-pattern="length"]')
          ?.classList.add('validation-item--ok')
      : document
          .querySelector('.validation-item[data-pattern="length"]')
          ?.classList.remove('validation-item--ok');

    if (this.form.get('password')?.value.length > 0) {
      const checkPattern = (key, pattern) => {
        if (this.form.get('password')?.value.match(pattern)) {
          document
            .querySelector(`.validation-item[data-pattern=${key}]`)
            ?.classList.add('validation-item--ok');
        } else {
          document
            .querySelector(`.validation-item[data-pattern=${key}]`)
            ?.classList.remove('validation-item--ok');
        }
      };
      const patterns: object = {
        numbers: new RegExp(/\d/g),
        lowercase: new RegExp(/[a-zа-я]/g),
        uppercase: new RegExp(/[A-ZА-Я]/g),
        symbols: new RegExp(/[~'`!@#№?$%^&*()=+<>|\\\/_.,:;\[\]{} \x22-]/g),
      };

      for (let key in patterns) {
        checkPattern(key, patterns[key]);
      }
    } else {
      document
        .querySelectorAll('.validation-item')
        .forEach((i) => i.classList.remove('validation-item--ok'));
    }
  }

  showAlert(message) {
    this.alert.show({
      title: 'Данные успешно сохранены',
      content: message,
      type: 'success',
    });
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

  clearModal(changes?: boolean) {
    this.form.reset();
    document.getElementById('modal-new-user')?.classList.add('hidden');
    this.currentUser = undefined;
    this.onClose.emit(changes);
  }
}
