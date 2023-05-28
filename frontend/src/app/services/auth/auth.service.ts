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

  public get user(): User {
    return this._user.value;
  }

  public get token(): string {
    return this._user.value?.token;
  }

  public get isLoggedIn(): boolean {
    return this._user.value != null && this._user.value.verified;
  }

  constructor(private http: HttpClient,
              private router: Router) {
    let savedUser = JSON.parse(localStorage.getItem('user'));
    this._user = new BehaviorSubject<User>(savedUser);
  }

  public login(user: string, password: string): Observable<User> {
    return this.http.post<User>(environment.apiUrl + 'auth/login', {user, password})
      .pipe(
        tap((user: User) => {
          this._user.next(user);
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(user)); // save to local storage to be still logged in later
        })
      );
  }

  public logout(): Observable<any> {

    // log user out on server
    return this.http.post<any>(environment.apiUrl + 'auth/logout', {})
      .pipe(
        take(1),
        tap(() => {
          // log user out in browser
          localStorage.removeItem('user');
          this._user.next(null);
          this.router.navigate(['login']);
        }));
  }

  public signup(username: string, email: string, password: string, password_confirmation: string): Observable<User> {
    return this.http.post<User>(environment.apiUrl + 'auth/register', {username, email, password, password_confirmation});
  }

  public checkUsername(username: string): Observable<{valid: boolean}> {
    return this.http.patch<{valid: boolean}>(environment.apiUrl + 'auth/username', {username});
  }
  public checkEmail(email: string): Observable<{valid: boolean}> {
    return this.http.patch<{valid: boolean}>(environment.apiUrl + 'auth/email', {email});
  }

  public resendVerificationMail(): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'auth/resend-verification-email', {});
  }
}
