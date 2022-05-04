import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.url.includes('login') ||
      req.url.includes('registration') ||
      req.url.includes('address')
    ) {
      return next.handle(req);
    } else {
      const clonedReq = req.clone({
        headers: req.headers.set('MDMToken', this.userService.token).set('MDMLogin', this.userService.login),
      });
      return next.handle(clonedReq).pipe( tap({
        next: ()=>{

        },
        error: (err)=>{
          console.log(clonedReq)
          if (err.status === 401){
            this.router.navigateByUrl('auth').then()
          }
        }
        })
      );
    }
  }
}
