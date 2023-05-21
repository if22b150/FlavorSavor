import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {map, Observable, take} from 'rxjs';
import {AuthService} from "../services/auth/auth.service";
import {ERole, User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard  {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user$.pipe(
      take(1),
      map((user: User) => {
        console.log(user)
        if (user && user.role == ERole.ADMIN) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      }));
  }

}
