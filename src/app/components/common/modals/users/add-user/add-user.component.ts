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

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  @Input() currentUser: Users | undefined;
  public form: FormGroup;
  public userTags = [];
  public file_input!: any;
  public file_placeholder!: Element;
  public avatar!: Element;
  public userPhoto!: string;
  @Output() onClose = new EventEmitter<boolean>();
  constructor(private elementRef: ElementRef, public userService: UserService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      login: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      userTags: new FormControl(''),
      other: new FormControl(''),
    });
  }

  ngOnChanges() {
    this.currentUser
      ? this.form.patchValue(this.currentUser)
      : this.form.reset();
  }

  ngOnInit() {
    let i = interval(500).subscribe(() => {
      if (this.userService.token) {
        i.unsubscribe();
        this.getUserTags();
      }
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
      })
      .catch((err) => {
        console.log(err);
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
          this.clearModal(true);
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
          this.clearModal(true);
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
          this.clearModal(true);
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
          this.clearModal(true);
        })
        .catch((err) => {
          console.log(err);
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

  clearModal(changes?: boolean) {
    this.form.reset();
    document.getElementById('modal-new-user')?.classList.add('hidden');
    this.currentUser = undefined;
    this.onClose.emit(changes);
  }
}
