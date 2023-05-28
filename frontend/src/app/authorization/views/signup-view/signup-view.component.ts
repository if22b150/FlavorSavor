import { Component } from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {finalize, map, Observable, of} from "rxjs";

@Component({
  selector: 'app-signup-view',
  templateUrl: './signup-view.component.html',
  styleUrls: ['./signup-view.component.scss']
})
export class SignupViewComponent {
  signupForm: FormGroup;
  loading: boolean;
  submitted: boolean;
  passwordsDontMatch: boolean;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9-_öäüß]+$')], [this.usernameIsUniqueValidator()]],
      email: [null , [Validators.required, Validators.email], [this.emailIsUniqueValidator()]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      password_confirmation: [null, Validators.required]
    })
  }

  submit() {
    this.submitted =true;
    this.passwordsDontMatch = false;

    if(this.signupForm.invalid)
      return;
    if(this.password.value != this.password_confirmation.value) {
      this.passwordsDontMatch = true;
      return;
    }

    this.loading = true;

    this.authService.signup(
      this.username.value,
      this.email.value,
      this.password.value,
      this.password_confirmation.value
    )
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        {
          next: () => {
            this.router.navigate(['/auth/login'], {queryParams: {'verify': true}});
          },
          error: (e) => {
            console.log(e)
              this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Es ist ein Fehler aufgetreten.' });
          }
        }
      )
  }

  usernameIsUniqueValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if(control.value.length >= 3)
        return this.authService.checkUsername(control.value).pipe(
          map((data: { valid: boolean }) => {
            return data.valid ? null : {usernameExists: true};
          })
        );
      else
        return null;
    };
  }
  emailIsUniqueValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if(control.value.length >= 5)
        return this.authService.checkEmail(control.value).pipe(
          map((data: { valid: boolean }) => {
            return data.valid ? null : {emailExists: true};
          })
        );
      else
        return null;
    };
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

