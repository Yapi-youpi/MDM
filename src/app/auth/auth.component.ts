import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import M from 'materialize-css';
import { UserService } from '../services/user.service';
import { AssetService } from '../services/asset.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public error: string = '';
  constructor(
    private auth: AuthService,
    private router: Router,
    private user: UserService,
    public asset: AssetService
  ) {}

  ngOnInit(): void {}
  login(login: string, password: string) {
    this.error = '';
    this.auth
      .login(login, password)
      .then(
        (res: {
          success: boolean;
          error: string;
          id: string;
          token: string;
        }) => {
          this.asset.setToStorage('token', res.token).then();
          this.asset.setToStorage('login', login).then();
          this.asset.setToStorage('last_password', password).then();
          this.user.token = res.token;
          this.user.login = login;
          this.user.last_password = password;
          this.router.navigateByUrl('devices').then(() => {
            if (res.error === 'change super admin password') {
              let elem = document.querySelector('.modal');
              M.Modal.init(elem);
              let instance = M.Modal.getInstance(elem);
              instance.open();
            }
          });
        }
      )
      .catch((err) => {
        console.log(err);
        this.error = err.error.error;
      });
  }
}
