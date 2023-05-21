import { Injectable } from '@angular/core';
import {BehaviorSubject, finalize, Observable, take, tap} from "rxjs";
import {User} from "../../models/user.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: BehaviorSubject<User>;

  public get user$(): Observable<User> {
    return this._user.asObservable();
  }

  public get token(): string {
    return this._user.value?.token;
  }


  constructor(private http: HttpClient,
              private router: Router) {
    let savedUser = JSON.parse(localStorage.getItem('user'));
    this._user = new BehaviorSubject<User>(savedUser);
  }

  public login(email: string, password: string): Observable<User> {
    return this.http.post<User>(environment.apiUrl + 'auth/login', {email, password})
      .pipe(
        tap((user: User) => {
          this._user.next(user);
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(user)); // save to local storage to be still logged in later
        })
      );
  }

  public logout(): void {

    // log user out on server
    this.http.post<any>(environment.apiUrl + 'logout', {})
      .pipe(
        take(1),
        finalize(() => {
          // log user out in browser
          localStorage.removeItem('user');
          this._user.next(null);
          this.router.navigate(['login']);
        })).subscribe();
  }
}
