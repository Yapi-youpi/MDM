import { Injectable } from '@angular/core';
import { assetService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class MyUserClass {
  public login: string = '';
  public token: string = '';

  constructor(private asset: assetService) {
    this.asset.getFromStorage('token').then((token: string) => {
      this.token = token;
    });
    this.asset.getFromStorage('login').then((login: string) => {
      this.login = login;
    });
  }
}
