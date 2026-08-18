import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormIndyComponent } from '../../../../library/components/form/form-indy.component';
import { getRegisterForm } from '../functions/auth.function';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormIndyComponent],
  template: `
    <div class="login-page">
      <section class="login-container">
        <div class="login-header">
          <div class="header-text">
            <h1>Benvenuto</h1>
            <p>Iscriviti al tuo sito per continuare</p>
          </div>
        </div>

        <div class="form-container">
          <app-form-indy [strutturaForm]="formRegister"></app-form-indy>
        </div>

        <div class="login-footer">
          <span>Hai gia un account?</span>
          <button type="button" (click)="router.navigate(['auth/login'])">
            Accedi
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
export class RegisterComponent {
  public router = inject(Router);
  public readonly formRegister = getRegisterForm();
}
