import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {map, Observable, take} from 'rxjs';
import {AuthService} from "../services/auth/auth.service";
import {ERole, User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user$.pipe(
      take(1),
      map((user: User) => {
        if(!this.authService.isLoggedIn)
          return true;

        if (user.role == ERole.ADMIN) {
          this.router.navigate(['admin']);
          return false;
        } else {
          this.router.navigate(['']);
          return false;
        }
      }));
  }

}
