import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {finalize} from "rxjs";
import {Message, MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {ERole} from "../../../models/user.model";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  signupForm: FormGroup;
  loading: boolean;
  newVerifyEmail: boolean = false;
  verifyEmailSent: boolean = false;
  messages: Message[];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      if(params.get('verify')) {
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Registrierung war erfolgreich. Bestätige nun die Verifizierungs-Mail.' });
        });
      }
    });

    this.signupForm = this.fb.group({
      user: [null, [Validators.required]],
      password: [null, Validators.required]
    })
  }

  submit() {
    if(this.signupForm.invalid)
      return;

    this.loading = true;
    this.verifyEmailSent = false;

    this.authService.login(
      this.user.value,
      this.password.value
    )
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        {
          next: (user) => {
            if(user.verified) {
              let route = user.role == ERole.ADMIN ? '/admin' : ''
              this.router.navigate([route]).then(() => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Erfolgreich',
                  detail: 'Der Login war erfolgreich.'
                });
              });
            } else {
              this.newVerifyEmail = true;
              this.messageService.add({
                severity: 'error',
                summary: 'Verifizierung ausstehend',
                detail: 'Bestätige deine E-Mail Adresse über die Verifizierungs-Mail in deinem Postkasten.'
              });
            }
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

  resendVerification() {
    this.authService.resendVerificationMail()
      .subscribe({
        next: () => {
          this.verifyEmailSent = true;
          this.newVerifyEmail = false;
          this.messages = [{ severity: 'success', detail: 'Eine neue Verifizierungs-Mail wurde an ' + this.authService.user.email + ' verschickt.' }];
        },
        error: (e) => {
          console.log(e);
          this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Mail konnte nicht verschickt werden.' });
        }
      })
  }

  get user(): AbstractControl {
    return this.signupForm.get('user');
  }
  get password(): AbstractControl {
    return this.signupForm.get('password');
  }

}
