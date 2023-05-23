import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.scss']
})
export class FrontendComponent implements OnInit {
  items: MenuItem[];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Login',
        icon: 'pi pi-fw pi-sign-in',
        routerLink: '/auth/login'
      },
    ];
  }

}
