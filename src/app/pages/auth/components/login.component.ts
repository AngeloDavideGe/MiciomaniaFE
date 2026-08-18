import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormIndyComponent } from '../../../../library/components/form/form-indy.component';
import { getLoginForm } from '../functions/auth.function';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormIndyComponent],
  template: `
    <div class="login-page">
      <section class="login-container">
        <div class="login-header">
          <div class="header-text">
            <h1>Bentornato</h1>
            <p>Accedi al tuo account per continuare</p>
          </div>
        </div>

        <div class="form-container">
          <app-form-indy [strutturaForm]="formLogin"></app-form-indy>
        </div>

        <div class="login-footer">
          <span>Non hai ancora un account?</span>
          <button type="button" (click)="router.navigate(['auth/register'])">
            Registrati
          </button>
        </div>

        <div class="login-footer" style="border-top: none;">
          <span>Vuoi entrare senza effetturale l'accesso?</span>
          <button type="button" (click)="router.navigate(['home'])">
            Entra
          </button>
        </div>
      </section>
    </div>
  `,
  styleUrl: '../styles/auth.style.scss',
})
export class LoginComponent {
  public router = inject(Router);
  public readonly formLogin = getLoginForm();
}
