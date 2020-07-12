import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      localStorage.setItem('loginReturnUrl', state.url);
      if (this.accountService.isAnonymous) {
        this.accountService.login();
        return false;
      }
      const user = this.accountService.user;
      if (!user || !user.roles || user.roles.length === 0) {
        this.router.navigate(['not-authorized']);
        return false;
      }

      // TODO: may want to add more extensive role checks per route here
      // next.data may contain arbitrary data to define what roles are required.
      return true;
  }
}
