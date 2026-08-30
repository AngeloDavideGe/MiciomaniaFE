import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormIndyComponent } from '../../../../library/components/form/form-indy.component';
import { handlerFunc } from '../../../../library/functions/handler.function';
import { AuthService } from '../../../shared/services/auth.service';
import { getRegisterForm } from '../functions/auth.function';
import { AppConfigService } from '../../../core/api/appConfig.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormIndyComponent],
  template: `
    <div class="login-page">
      <section class="login-container">
        <div class="login-header">
          <div class="header-text">
            <h1>{{ lang.Titolo }}</h1>
            <p>{{ lang.Descrizione }}</p>
          </div>
        </div>

        <div class="form-container">
          <app-form-indy
            [strutturaForm]="formRegister"
            (invioDati)="registerComplete($event)"
          ></app-form-indy>
        </div>

        <div class="login-footer">
          <span>{{ lang.AccountEsistente }}</span>
          <button type="button" (click)="router.navigate(['auth/login'])">
            {{ lang.Accedi }}
          </button>
        </div>

        <div class="login-footer" style="border-top: none;">
          <span>{{ lang.AccessoOspite }}</span>
          <button type="button" (click)="router.navigate(['home'])">
            {{ lang.Entra }}
          </button>
        </div>
      </section>
    </div>
  `,
  styleUrl: '../styles/auth.style.scss',
})
export class RegisterComponent {
  public router = inject(Router);
  private readonly authService = inject(AuthService);
  private appConfig = inject(AppConfigService);

  public readonly lang = this.appConfig.lang.Register;
  public readonly formRegister = getRegisterForm(this.lang.Form);

  public registerComplete(event: RegisterFormValue): void {
    handlerFunc<void>({
      callHttp: () =>
        this.authService.postUser(
          event.nome,
          event.id,
          event.email,
          event.password,
        ),
      nextCall: () => this.router.navigate(['auth/login']),
    });
  }
}

interface RegisterFormValue {
  id: string;
  nome: string;
  email: string;
  password: string;
}
