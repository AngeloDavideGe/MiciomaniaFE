import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataHttp } from '../../../../core/api/http.data';
import { User } from '../../../../shared/interfaces/users.interface';
import { LoginBase } from '../../base/login-base.class';
import { auth_shared_imports } from '../../shared/auth-shared.import';

@Component({
  selector: 'app-new-login',
  standalone: true,
  imports: auth_shared_imports,
  templateUrl: './new-login.component.html',
})
export class NewLoginComponent extends LoginBase {
  constructor() {
    super();
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    let controllo: boolean = true;

    DataHttp.allUsers.forEach((user: User) => {
      if (user.credenziali.email == this.f['email'].value) {
        controllo = false;
      }
    });

    if (controllo) {
      this.getUserByEmailPassword({
        email: this.f['email'].value!,
        password: this.f['password'].value!,
        tipo: 'new-login',
      });
    }
  }
}
