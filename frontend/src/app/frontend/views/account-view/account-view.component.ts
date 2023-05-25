import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {finalize} from "rxjs";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent {
  logoutLoading: boolean;

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router) {
  }

  logout() {
    this.logoutLoading = true;

    this.authService.logout()
      .pipe(finalize(() => this.logoutLoading = false))
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
