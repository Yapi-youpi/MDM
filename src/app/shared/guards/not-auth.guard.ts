import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from '../models';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(private _user: UserModel, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._user.isAuth().then((res) => {
      if (!res) return true;
      else {
        this._router.navigate(['/devices']).then();
        return false;
      }
    });
  }
}
