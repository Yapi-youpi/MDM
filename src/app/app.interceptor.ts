import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor() {}
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
      console.log(req);
      const clonedReq = req.clone({});
      return next.handle(clonedReq).pipe(
        tap(
          () => {},
          () => {}
        )
      );
    }
  }
}
