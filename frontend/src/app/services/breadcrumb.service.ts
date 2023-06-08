import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private _breadcrumb: BehaviorSubject<{link: string, text: string}>;

  public get breadcrumb$(): Observable<{link: string, text: string}> {
    return this._breadcrumb.asObservable();
  }
  public get breadcrumb(): {link: string, text: string} {
    return this._breadcrumb.value;
  }
  public set breadcrumb(breadcrumb: {link: string, text: string}) {
    sessionStorage.setItem('breadcrumb', JSON.stringify(breadcrumb));
    this._breadcrumb.next(breadcrumb);
  }

  constructor() {
    let savedBreadcrumb = JSON.parse(sessionStorage.getItem('breadcrumb'));
    this._breadcrumb = new BehaviorSubject<{link: string; text: string}>(savedBreadcrumb);
  }
}
