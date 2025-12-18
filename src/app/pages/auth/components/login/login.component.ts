import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { DataHttp } from '../../../../core/api/http.data';
import { mapUserByDb } from '../../../../shared/handlers/functions/user.function';
import {
  User,
  UserParams,
} from '../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../shared/services/api/auth.service';
import { LoginForm } from '../../interfaces/auth-forms.interface';
import { auth_shared_imports } from '../../shared/auth-shared.import';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: auth_shared_imports,
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private authService = inject(AuthService);
  public router = inject(Router);

  public loginForm: FormGroup<LoginForm>;
  public loginError = false;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: [
        this.getEmailRegistrata() || '',
        [Validators.required, Validators.email],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.login(this.f['email'].value!, this.f['password'].value!).subscribe({
      next: (data: boolean) => this.provaLogin(data),
      error: (error) => {
        this.loginError = true;
        console.error('errore nel login', error);
      },
    });
  }

  private provaLogin(data: boolean): void {
    if (data) {
      this.loginError = false;
      DataHttp.listaManga.set([]);
      this.router.navigate(['/home']);
    } else {
      this.loginError = true;
    }
  }

  private getEmailRegistrata(): string | null {
    const navigation: Navigation | null = this.router.lastSuccessfulNavigation;
    return navigation?.extras.state?.['message'] ?? null;
  }

  private login(email: string, password: string): Observable<boolean> {
    return this.authService.getUserByEmailAndPassword(email, password).pipe(
      take(1),
      map((data: User) => {
        const user: User = mapUserByDb(data);
        DataHttp.user.set(user);
        this.authService.users.update((users: UserParams[]) =>
          users.filter((x: UserParams) => x.id !== user.id)
        );
        return true;
      })
    );
  }
}
