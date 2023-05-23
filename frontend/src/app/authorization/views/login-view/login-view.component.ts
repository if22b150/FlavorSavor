import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;

  constructor(private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      user: [null, [Validators.required]],
      password: [null, Validators.required]
    })
  }

  submit() {
    this.loading = true;
  }

  get user(): AbstractControl {
    return this.loginForm.get('user');
  }
  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

}
