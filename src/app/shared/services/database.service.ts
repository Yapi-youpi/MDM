import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor() {
    Parse.initialize(
      'MDMSERVER12324990543BSFD93234',
      'U52RUG55222VAJ5478JDE32T3TE223B77YA'
    );
    (Parse as any).serverURL = environment.serverURL;
    (Parse as any).liveQueryServerURL = environment.liveQueryServerURL;
  }

  query(cl: any) {
    return new Parse.Query(cl);
  }

  async logIN(login: string, password: string) {
    return await Parse.User.logIn(login, password);
  }

  signup(login: string, password: string) {
    const user = new Parse.User();
    user.set('username', login);
    user.set('password', password);
    user.set('email', login + '@gmail.com');
    return new Promise<any>((resolve, reject) => {
      user
        .signUp()
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          if (
            err.toString().includes('Account already exists for this username.')
          ) {
            reject(400);
          }
        });
    });
  }
}
