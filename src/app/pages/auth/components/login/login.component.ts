import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginBase } from '../../base/login-base.class';
import { auth_shared_imports } from '../../shared/auth-shared.import';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: auth_shared_imports,
  templateUrl: './login.component.html',
})
export class LoginComponent extends LoginBase {
  constructor() {
    super();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.getUserByEmailPassword({
        email: this.f['email'].value!,
        password: this.f['password'].value!,
        tipo: 'login',
      });
    }
  }
}
