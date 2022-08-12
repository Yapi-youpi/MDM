import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { assetService } from '../shared/services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private asset: assetService) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean | UrlTree> | boolean {
    console.log('check Auth Guard');

    const roles = route.data['requiredRoles'] as Array<string>;

    return this.asset.getFromStorage('user-role').then((role = '') => {
      return roles.includes(role);
    });
  }

  /*  public canLoad():
    boolean | Observable<boolean> | Promise<boolean> {
    console.log('check Loading Guard');
    return true;
  }*/
}
