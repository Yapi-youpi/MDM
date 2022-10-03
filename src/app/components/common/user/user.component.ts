import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  assetService,
  authService,
  userService,
} from '../../../shared/services';
import { IUser } from '../../../shared/types/users';
import { MyUserClass } from '../../../shared/classes/users/my-user.class';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  private id: string = '';
  public currentUser!: IUser;
  public isPopupOpen: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private auth: authService,
    public user: userService,
    public router: Router,
    public asset: assetService,
    private myUser: MyUserClass
  ) {}

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isPopupOpen = false;
    }
  }

  ngOnInit() {
    this.asset.getFromStorage('id').then((id: string) => {
      this.id = id;

      this.getUser();
    });
  }

  togglePopup() {
    this.isPopupOpen = !this.isPopupOpen;
  }

  getUser() {
    this.user
      .get(this.id, 'uid')
      .then((res) => {
        this.currentUser = res[0];
        this.asset.setToStorage('user-role', res[0].role).then();
      })
      .catch((err) => {
        console.log(err);
        this.asset.setToStorage('user-role', '').then();
      });
  }

  setUser(change) {
    if (change) {
      this.getUser();
    } else this.currentUser = { ...this.currentUser };
    this.isPopupOpen = false;
  }

  logout() {
    this.auth
      .logout(this.myUser.token, this.myUser.login)
      .then((res) => {
        if (res) {
          this.myUser.token = '';
          this.router.navigateByUrl('auth').then();
          this.asset.removeFromStorage('id').then();
          this.asset.removeFromStorage('token').then();
          this.asset.removeFromStorage('name').then();
          this.asset.removeFromStorage('login').then();
          this.asset.removeFromStorage('last_password').then();
          this.asset.removeFromStorage('user-role').then();
          localStorage.clear();
        } else {
          console.log('Ошибка выхода из системы');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
