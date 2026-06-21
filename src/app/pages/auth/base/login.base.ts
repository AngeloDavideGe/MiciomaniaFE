import { inject, signal } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { handlerFunc } from '../../../../library/functions/handler.function';
import { setUserDataNull } from '../../../core/functions/storage.function';
import { User } from '../../../shared/interfaces/users.interface';
import { AuthService } from '../../../shared/services/api/auth.service';
import { ElementiUtenteService } from '../../../shared/services/api/elementiUtente.service';

export abstract class LoginBase {
  public router = inject(Router);
  protected authService = inject(AuthService);
  protected elementiUtenteService = inject(ElementiUtenteService);

  public loginError = signal<boolean>(false);

  protected getUserByEmailPassword(params: {
    email: string;
    password: string;
    tipo: string;
  }): void {
    handlerFunc<User>({
      callHttp: () =>
        this.authService.getUserByEmailAndPassword(
          params.email,
          params.password,
        ),
      nextCall: (data: User) => {
        setUserDataNull(
          data,
          this.authService,
          params.tipo,
          this.elementiUtenteService,
        );
        this.loginError.set(false);
        this.elementiUtenteService.utenteParodie.set(null);
        this.router.navigate(['/home']);
      },
      errorCall: () => this.loginError.set(true),
    });
  }

  protected getEmailRegistrata(): string | null {
    const navigation: Navigation | null =
      this.router.lastSuccessfulNavigation();
    return navigation?.extras.state?.['message'] ?? null;
  }
}
