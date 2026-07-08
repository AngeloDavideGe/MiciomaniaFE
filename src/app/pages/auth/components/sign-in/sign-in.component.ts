import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormIndyComponent } from '../../../../../library/components/form/form-indy.component';
import { handlerFunc } from '../../../../../library/functions/handler.function';
import { RecordStruttura } from '../../../../../library/interfaces/form.interface';
import { dynamicValidator } from '../../../../../library/validators/dynamic.validator';
import { usernameValidator } from '../../../../../library/validators/username.validator';
import { AuthService } from '../../../../shared/services/api/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormIndyComponent, RouterLink],
  template: `<div class="card-header text-center">
      <h3 class="h4">Sign In</h3>
    </div>

    <app-form-indy
      [strutturaForm]="signinConfig"
      (invioDati)="registrazione($event)"
    >
      <div erroreCustom>
        <div class="text-center mt-3">
          <span>Hai già un account? </span>
          <a routerLink="/auth/login" class="text-primary"> Accedi </a>
        </div>
      </div>
    </app-form-indy> `,
})
export class SignInComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  public signinConfig: RecordStruttura = {
    nome: {
      titolo: 'Nome',
      validators: [Validators.required, Validators.minLength(3)],
      tipo: 'Text',
      errorMessage: 'Campo Obbligatorio (Almeno 3 lettere)',
    },
    username: {
      titolo: 'Username',
      validators: [
        Validators.required,
        Validators.minLength(3),
        usernameValidator(),
      ],
      errorMessage: 'Campo Obbligatorio (Almeno 3 lettere minuscole)',
      tipo: 'Text',
    },
    email: {
      titolo: 'Email',
      validators: [Validators.required, Validators.email],
      tipo: 'Text',
      errorMessage: 'Campo Obbligatorio (prova@ex)',
    },
    password: {
      titolo: 'Password',
      validators: [Validators.required, Validators.minLength(6)],
      tipo: 'Password',
      errorMessage: 'Campo Obbligatorio (Almeno 6 lettere)',
    },
    confirm_password: {
      titolo: 'Conferma Password',
      validators: [],
      tipo: 'Password',
      errorMessage: 'Deve essere uguale alla password inserita',
      onChange: (_value, form) => {
        const password = form.get('password')?.value;
        const confirm = form.get('confirm_password');

        if (!confirm) return;

        confirm.setValidators([
          Validators.required,
          dynamicValidator(() => password === confirm.value),
        ]);

        confirm.updateValueAndValidity({ emitEvent: false });
      },
    },
  };

  public registrazione(params: {
    nome: string;
    username: string;
    email: string;
    password: string;
    confirm_password: string;
  }): void {
    if (params.password !== params.confirm_password) {
      return;
    }

    handlerFunc<void>({
      callHttp: () =>
        this.authService.postUser(
          params.nome,
          params.username,
          params.email,
          params.password,
        ),
      nextCall: () =>
        this.router.navigate(['/auth/login'], {
          state: { message: params.email },
        }),
    });
  }
}
