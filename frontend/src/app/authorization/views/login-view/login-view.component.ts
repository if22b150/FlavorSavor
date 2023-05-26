import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {finalize} from "rxjs";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  signupForm: FormGroup;
  loading: boolean;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      user: [null, [Validators.required]],
      password: [null, Validators.required]
    })
  }

  submit() {
    if(this.signupForm.invalid)
      return;

    this.loading = true;

    this.authService.login(
      this.user.value,
      this.password.value
    )
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        {
          next: () => {
            this.router.navigate(['']).then(() => {
                this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Der Login war erfolgreich.' });
            });
          },
          error: (e) => {
            if(e.error == "Credentials incorrect")
              this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Das Passwort ist inkorrekt.' });
            else if (e.error == "The selected email or username is invalid.")
              this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Ungültiger Username oder E-Mail Adresse.' });
            else
              this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Es ist ein Fehler aufgetreten.' });
          }
        }
      )
  }

  get user(): AbstractControl {
    return this.signupForm.get('user');
  }
  get password(): AbstractControl {
    return this.signupForm.get('password');
  }

}
