import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthService} from "../services/auth/auth.service";
import {User} from "../models/user.model";
import {BreadcrumbService} from "../services/breadcrumb.service";

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.scss']
})
export class FrontendComponent implements OnInit {
  items: MenuItem[];

  constructor(private authService: AuthService,
              public breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe({
      next: (user: User) => {
        if(this.authService.isLoggedIn) {
          this.items = [
            {
              label: 'Rezepte durchsuchen',
              icon: 'pi pi-fw pi-search',
              routerLink: '/recipes',
            },
            {
              label: 'Mein Kochbuch',
              icon: 'pi pi-fw pi-book',
              routerLink: '/cookbook'
            },
            {
              label: 'Account',
              icon: 'pi pi-fw pi-user',
              routerLink: '/account'
            }
          ];
        } else {
          this.items = [
            {
              label: 'Login',
              icon: 'pi pi-fw pi-sign-in',
              routerLink: '/auth/login'
            }
          ];
        }
      }
    })
  }

}
