import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import Compressor from 'compressorjs';
import { interval } from 'rxjs';
import { AssetService } from '../../../../../shared/services/asset.service';
import { add } from '../../../../../shared/services/forms/user';
import { MyUserClass } from '../../../../../shared/classes/users/my-user.class';
import { UsersClass } from '../../../../../shared/classes/users/users.class';
import { IUser } from '../../../../../shared/types';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  @Input() currentUser: IUser | null = null;

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
    private elementRef: ElementRef,
    private form: add,
    private myUser: MyUserClass,
    private users: UsersClass
  ) {}

  get _form() {
    return this.form.form;
  }

  get _tags() {
    return this.users.tags;
  }

  get _role() {
    return this.myUser.role;
  }

  ngOnChanges() {
    if (this.currentUser) {
      this._form.patchValue(this.currentUser);
      this.currentUser.login === this.myUser.login
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
    let i = interval(1000).subscribe(() => {
      if (this.myUser.token) {
        if (this.currentUser?.login === this.myUser.login)
          this.isEditSelf = true;
        if (this._role === 'super' || this._role === 'admin')
          this.getUserTags();
        i.unsubscribe();
      }
    });
  }

  getUserTags() {
    this.users.getTags().then();
  }

  addUser() {
    if (this.form.values) {
      const avatar = this.userPhoto;
      const login = this.form.values.login;
      const name = this.form.values.name;
      const password = this.form.values.password;
      const role = this.form.values.role;
      const group = (this.form.values.userTags === 'Другое'
        ? [this.form.values.other]
        : [this.form.values.userTags]) as unknown as string[];

      this.users.add(avatar, login, password, name, role, group).then((res) => {
        if (res) this.clearModal(true);
      });
    }
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
    if (this.form.values) {
      const avatar = this.userPhoto;
      const login = this.form.values.login;
      const name = this.form.values.name;
      const password = this.form.values.password;
      const group = (this.form.values.userTags === 'Другое'
        ? [this.form.values.other]
        : [this.form.values.userTags]) as unknown as string[];

      if (password) {
        if (this.isEditSelf) {
          const lastPassword = this.form.values.oldPassword;
          this.myUser
            .changePassword(this.myUser.login, lastPassword, password)
            .then((res) => {
              if (res) {
                document.getElementById('old-pass')?.removeAttribute('style');
                this.clearModal(true);
              } else {
                //     if (err.error.error === 'wrong password or login') {
                //       document
                //         .getElementById('old-pass')
                //         ?.setAttribute('style', 'outline: 2px solid #eb4f4f;');
                //     }
              }
            });
        } else {
          this.users.changePassword(login, password.trim()).then((res) => {
            if (res) {
              this.currentUser = null;
              this.clearModal(true);
            }
          });
        }
      }

      if (avatar && avatar?.length > 0) {
        this.users.uploadAvatar(this.currentUser!.id, avatar).then((res) => {
          if (res) {
            this.currentUser = null;
            this.clearModal(true);
          }
        });
      }

      if (group[0][0] !== this.currentUser?.userTags[0]) {
        this.users.changeTag(this.currentUser!.id, group).then((res) => {
          if (res) {
            this.currentUser = null;
            this.clearModal(true);
          }
        });
      }

      if (name !== this.currentUser!.name) {
        this.users.rename(login, name).then((res) => {
          if (res) {
            this.currentUser = null;
            this.clearModal(true);
          }
        });
      }
    }
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

  showValidation() {
    document.querySelector('.validation-list')?.classList.remove('hidden');
  }

  hideValidation() {
    document.querySelector('.validation-list')?.classList.add('hidden');
  }

  validate() {
    this.form.values.password.length >= 8
      ? document
          .querySelector('.validation-item[data-pattern="length"]')
          ?.classList.add('validation-item--ok')
      : document
          .querySelector('.validation-item[data-pattern="length"]')
          ?.classList.remove('validation-item--ok');

    if (this.form.values.password.length > 0) {
      const checkPattern = (key, pattern) => {
        if (this._form.get('password')?.value.match(pattern)) {
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
    this.currentUser = null;
    this.onClose.emit(changes);
  }
}
