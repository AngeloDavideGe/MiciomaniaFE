import { Component } from '@angular/core';
import { DataHttp } from '../../../../core/api/http.data';
import { User } from '../../../../shared/interfaces/users.interface';
import { LoginBase } from '../../base/login.base';
import { FormCustomComponent } from '../../../../../library/components/form/form.component';
import { RouterLink } from '@angular/router';
import { Validators } from '@angular/forms';
import { RecordStruttura } from '../../../../../library/interfaces/form.interface';

@Component({
  selector: 'app-new-login',
  standalone: true,
  imports: [FormCustomComponent, RouterLink],
  template: `<div class="card-header text-center">
      <h3 class="h4">New Login</h3>
    </div>

    <app-form-custom [strutturaForm]="loginConfig" (invioDati)="login($event)">
      <div erroreCustom>
        @if (loginError()) {
          <p style="color: var(--red-miciomania);">Credenziali Errate</p>
        }

        <div class="text-center mt-3">
          <span>Hai già un account? </span>
          <a routerLink="/auth/home" class="text-primary"> Torna alla Home </a>
        </div>
      </div>
    </app-form-custom> `,
})
export class NewLoginComponent extends LoginBase {
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
    let controllo: boolean = true;

    DataHttp.allUsers.forEach((user: User) => {
      if (user.credenziali.email == params.email) {
        controllo = false;
      }
    });

    if (controllo) {
      this.getUserByEmailPassword({
        email: params.email,
        password: params.password,
        tipo: 'new-login',
      });
    }
  }
}
