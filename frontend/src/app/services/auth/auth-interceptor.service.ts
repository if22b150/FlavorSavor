import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private authService: AuthService) { }

  // this method will add the Bearer token to the Header of the HTTP-Request if a user is logged in
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.token) {
      const modifiedRequest = req.clone({headers: new HttpHeaders().append("Authorization", "Bearer " + this.authService.token)});
      return next.handle(modifiedRequest);
    }

    return next.handle(req);
  }
}
