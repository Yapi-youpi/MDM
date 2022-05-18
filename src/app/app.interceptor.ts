import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import M from 'materialize-css';
import { ErrorService } from './services/error.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private router: Router,
    private err: ErrorService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.url.includes('login') ||
      req.url.includes('registration') ||
      req.url.includes('address')
    ) {
      return next.handle(req).pipe(
        tap({
          next: () => {},
          error: (err) => {
            if (err.error?.error) {
              this.err.errorCatch(err.error.error);
            }
          },
        })
      );
    } else {
      const clonedReq = req.clone({
        headers: req.headers
          .set('MDMToken', this.userService.token)
          .set('MDMLogin', this.userService.login),
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
            if (err.status === 403) {
              this.router.navigateByUrl('auth').then();
            }
            if (err.status === 0) {
              M.toast({ html: 'Сервер недоступен' });
            }
          },
        })
      );
    }
  }
}
