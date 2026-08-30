import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormIndyComponent } from '../../../../library/components/form/form-indy.component';
import { getLoginForm } from '../functions/auth.function';
import { AuthService } from '../../../shared/services/auth.service';
import { handlerFunc } from '../../../../library/functions/handler.function';
import { User, UserToken } from '../../../shared/interfaces/users.interface';
import { AppConfigService } from '../../../core/api/appConfig.service';

@Component({
  selector: 'app-login',
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
            [strutturaForm]="formLogin"
            (invioDati)="loginComplete($event)"
          ></app-form-indy>
        </div>

        <div class="login-footer">
          <span>{{ lang.NessunAccount }}</span>
          <button type="button" (click)="router.navigate(['auth/register'])">
            {{ lang.Registrati }}
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
export class LoginComponent {
  public router = inject(Router);
  public authService = inject(AuthService);
  private appConfig = inject(AppConfigService);

  public readonly lang = this.appConfig.lang.Login;
  public readonly formLogin = getLoginForm(this.lang.Form);

  public loginComplete(event: { email: string; password: string }): void {
    handlerFunc<UserToken>({
      callHttp: () =>
        this.authService.getUserByEmailAndPassword(event.email, event.password),
      nextCall: (data: UserToken) => {
        this.authService.currentUser.set(data.user);

        if (data.user) {
          this.authService.accountsUser.update((accounts: User[]) => {
            const accountIndex: number = accounts.findIndex(
              (account: User) => account.id === data.user?.id,
            );

            if (accountIndex === -1) {
              return [...accounts, data.user as User];
            }

            return accounts.map((account: User, index: number) =>
              index === accountIndex ? (data.user as User) : account,
            );
          });
          this.authService.token.set(data.token);
          this.router.navigate(['home']);
        }
      },
    });
  }
}
