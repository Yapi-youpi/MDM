import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { errorService } from './hide/shared/services';
import { MyUserClass } from './hide/shared/classes/users/my-user.class';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    // private userService: UserService,
    private myUser: MyUserClass,
    private router: Router,
    private err: errorService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.myUser.token;
    const login = this.myUser.login;
    // console.log(req);
    if (
      req.url.includes('login') ||
      req.url.includes('registration') ||
      req.url.includes('address')
    ) {
      return next.handle(req).pipe(
        tap({
          next: (req) => {
            console.log(req, 'REQ');
          },
          error: (err) => {
            if (err.error?.error) {
              this.err.errorCatch(err.error.error);
              if (err.error.error === 'not found') {
                err.error.error = 'Пользователь ' + err.error.error;
              }
            }
          },
        })
      );
    } else {
      // console.log(token, login);
      const clonedReq = req.clone({
        headers: req.headers.set('MDMToken', token).set('MDMLogin', login),
      });
      return next.handle(clonedReq).pipe(
        tap({
          next: () => {},
          error: (err) => {
            if (err.error?.error) {
              console.log(err.error.error);
              this.err.errorCatch(err.error.error);
            }
            if (err.status === 401) {
              this.router.navigateByUrl('auth').then();
            }
            // if (err.status === 403) {
            //   this.router.navigateByUrl('auth').then();
            // }
            if (err.status === 0) {
              // M.toast({ html: 'Сервер недоступен' });
            }
          },
        })
      );
    }
  }
}
