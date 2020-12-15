import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthorized: boolean = !! localStorage.getItem('currentUser');
    if (!isAuthorized && state.url.match(/^\/(main|clear)$/ig)){
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }else if (isAuthorized && state.url.match(/^\/(login|register)$/ig)){
      this.router.navigate(['/main'], { queryParams: { returnUrl: state.url }});
      return false;
    }

    return true;
  }
}
