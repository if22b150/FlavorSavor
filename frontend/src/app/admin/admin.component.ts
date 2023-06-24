import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {AuthService} from "../services/auth/auth.service";
import {finalize} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  items: MenuItem[];

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'User',
        icon: 'pi pi-fw pi-users',
        routerLink: 'users',
      },
      {
        label: 'Rezepte',
        icon: 'pi pi-fw pi-list',
        routerLink: 'recipes'
      },
      {
        label: 'Zutaten',
        icon: 'pi pi-fw pi-book',
        routerLink: 'ingredients'
      },
      {
        label: 'Kategorien',
        icon: 'pi pi-fw pi-user',
        routerLink: 'categories'
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => {
          this.authService.logout()
            .subscribe({
              next: () => {
                this.messageService.add({severity: 'success', summary: 'Erfolgreich', detail: 'Erfolgreich ausgeloggt.'});
                this.router.navigate(['']);
              },
              error: (e) => {
                console.log(e);
                this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Es ist ein Fehler aufgetreten.'});
              }
            });
        }
      }
    ];
  }

}
