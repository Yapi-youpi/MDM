import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor() {
    Parse.initialize(environment.parseInit.appId, environment.parseInit.jsKey);
    (Parse as any).serverURL = environment.parseInit.serverURL;
    (Parse as any).liveQueryServerURL = environment.parseInit.lqServerURL;
  }

  query(cl: any) {
    return new Parse.Query(cl);
  }

  async logIN(login: string, password: string) {
    return await Parse.User.logIn(login, password);
  }

  signUp(login: string, password: string) {
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
