import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormCustomComponent } from '../../../../../library/components/form/form.component';
import { RecordStruttura } from '../../../../../library/interfaces/form.interface';
import { LoginBase } from '../../base/login.base';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormCustomComponent, RouterLink],
  template: `<div class="card-header text-center">
      <h3 class="h4">Login</h3>
    </div>

    <app-form-custom [strutturaForm]="loginConfig" (invioDati)="login($event)">
      <div erroreCustom>
        @if (loginError()) {
          <p style="color: var(--red-miciomania);">Credenziali Errate</p>
        }

        <div class="text-center mt-3">
          <span>Non hai un account? </span>
          <a routerLink="/auth/sign-in" class="text-primary"> Registrati </a>
        </div>
      </div>
    </app-form-custom> `,
})
export class LoginComponent extends LoginBase {
  public loginConfig: RecordStruttura = {
    email: {
      titolo: 'Email',
      valueInit: this.getEmailRegistrata() || '',
      validators: [Validators.required, Validators.email],
      tipo: 'Text',
    },
    password: {
      titolo: 'Password',
      validators: [Validators.required, Validators.minLength(6)],
      tipo: 'Password',
    },
  };

  public login(params: { email: string; password: string }): void {
    this.getUserByEmailPassword({
      email: params.email,
      password: params.password,
      tipo: 'login',
    });
  }
}
