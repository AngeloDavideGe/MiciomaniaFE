import { inject, signal } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { take } from 'rxjs';
import { setUserDataNull } from '../../../core/functions/storage.function';
import { mapUserByDb } from '../../../shared/handlers/functions/user.function';
import { AuthService } from '../../../shared/services/api/auth.service';
import { ElementiUtenteService } from '../../../shared/services/api/elementiUtente.service';
import { User } from '../../../shared/interfaces/users.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from '../interfaces/auth-forms.interface';

export abstract class LoginBase {
  public router = inject(Router);
  private formBuilder = inject(FormBuilder);
  protected authService = inject(AuthService);
  protected elementiUtenteService = inject(ElementiUtenteService);

  public loginForm: FormGroup<LoginForm>;
  public loginError = signal<boolean>(false);

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: [
        this.getEmailRegistrata() || '',
        [Validators.required, Validators.email],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public get f(): LoginForm {
    return this.loginForm.controls;
  }

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

  private getEmailRegistrata(): string | null {
    const navigation: Navigation | null = this.router.lastSuccessfulNavigation;
    return navigation?.extras.state?.['message'] ?? null;
  }
}
