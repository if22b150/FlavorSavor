import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, finalize, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _users: BehaviorSubject<User[]>;

  public get users$(): Observable<User[]> {
    return this._users.asObservable();
  }
  public get users(): User[] {
    return this._users.value;
  }

  public set users(users: User[]) {
    this._users.next(users);
  }

  _loading: BehaviorSubject<boolean>;
  public get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  constructor(private http: HttpClient) {
    this._users = new BehaviorSubject<User[]>(null);
    this._loading = new BehaviorSubject<boolean>(null);
  }

  public getAll() {
    this._loading.next(true);
    this.http.get<User[]>(environment.adminApiUrl + 'users')
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe({
        next: (users) => {
          this.users = users;
        }
      });
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(environment.adminApiUrl + `users/${id}`);
  }
}
