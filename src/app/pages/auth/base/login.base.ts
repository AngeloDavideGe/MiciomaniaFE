import { inject, signal } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { take } from 'rxjs';
import { setUserDataNull } from '../../../core/functions/storage.function';
import { mapUserByDb } from '../../../shared/handlers/functions/user.function';
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
    this.authService
      .getUserByEmailAndPassword(params.email, params.password)
      .pipe(take(1))
      .subscribe({
        next: (data: User) => {
          setUserDataNull(mapUserByDb(data), this.authService, params.tipo);
          this.loginError.set(false);
          this.elementiUtenteService.utenteParodie.set(null);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.loginError.set(true);
          console.error('errore nel login', error);
        },
      });
  }

  protected getEmailRegistrata(): string | null {
    const navigation: Navigation | null = this.router.lastSuccessfulNavigation;
    return navigation?.extras.state?.['message'] ?? null;
  }
}
