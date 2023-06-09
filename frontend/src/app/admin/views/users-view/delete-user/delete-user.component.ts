import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../../services/admin/user.service";
import {User} from "../../../../models/user.model";
import {finalize} from "rxjs";

@Component({
  selector: 'app-user-delete',
  template: `
    <p-button icon="pi pi-trash" styleClass="p-button-danger" [loading]="loading" (click)="delete()"></p-button>
  `,
  styles: []
})
export class DeleteUserComponent {
  @Input() user: User;
  loading: boolean;

  constructor(private userService: UserService) {
  }

  delete() {
    this.loading = true;
    this.userService.delete(this.user.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.userService.getAll();
        }
      })
  }
}
