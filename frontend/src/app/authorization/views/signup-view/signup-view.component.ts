import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {finalize} from "rxjs";

@Component({
  selector: 'app-signup-view',
  templateUrl: './signup-view.component.html',
  styleUrls: ['./signup-view.component.scss']
})
export class SignupViewComponent {
  signupForm: FormGroup;
  loading: boolean;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-_öäüß]+$')]],
      email: [null , [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      password_confirmation: [null, Validators.required]
    })
  }

  submit() {
    if(this.signupForm.invalid)
      return;

    this.loading = true;

    // this.authService.signup(
    //   this.username.value,
    //   this.password.value
    // )
    //   .pipe(finalize(() => this.loading = false))
    //   .subscribe(
    //     {
    //       next: () => {
    //         this.router.navigate(['']).then(() => {
    //           this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Der Signup war erfolgreich.' });
    //         });
    //       },
    //       error: (e) => {
    //         if(e.error == "Credentials incorrect")
    //           this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Das Passwort ist inkorrekt.' });
    //         else if (e.error == "The selected email or usernamename is invalid.")
    //           this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Ungültiger usernamename oder E-Mail Adresse.' });
    //         else
    //           this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Es ist ein Fehler aufgetreten.' });
    //       }
    //     }
    //   )
  }

  get username(): AbstractControl {
    return this.signupForm.get('username');
  }

  get email(): AbstractControl {
    return this.signupForm.get('email');
  }
  get password(): AbstractControl {
    return this.signupForm.get('password');
  }
  get password_confirmation(): AbstractControl {
    return this.signupForm.get('password_confirmation');
  }
}

