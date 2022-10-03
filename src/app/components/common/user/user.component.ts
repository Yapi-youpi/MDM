import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authService } from '../../../shared/services';
import { MyUserClass } from '../../../shared/classes/users/my-user.class';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public isPopupOpen: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private auth: authService,
    public router: Router,
    private myUser: MyUserClass
  ) {}

  get _me() {
    return this.myUser.me;
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isPopupOpen = false;
    }
  }

  ngOnInit() {
    this.myUser.getMe().then();
  }

  togglePopup() {
    this.isPopupOpen = !this.isPopupOpen;
  }

  setUser(change) {
    if (change) {
      // todo: обращаться в другой класс
      this.myUser.get(this.myUser.id).then();
    } else this.myUser.me = { ...this.myUser.me };
    this.isPopupOpen = false;
  }

  logout() {
    this.myUser.signOut().then((res) => {
      if (res) {
        this.router.navigateByUrl('auth').then();
      }
    });
  }
}
