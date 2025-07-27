import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthHandler } from '../../../../shared/handlers/auth.handler';
import { MangaHandler } from '../../../manga/handlers/manga.handler';
import { auth_shared_imports } from '../../shared/auth-shared.import';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: auth_shared_imports,
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public loginForm: FormGroup;
  public loginError = false;

  private mangaHandler = inject(MangaHandler);
  private authHandler = inject(AuthHandler);
  public router = inject(Router);

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

    this.authHandler
      .login(this.f['email'].value, this.f['password'].value)
      .pipe(take(1))
      .subscribe({
        next: (data) => this.provaLogin(data),
        error: (error) => {
          this.loginError = true;
          console.error('errore nel login', error);
        },
      });
  }

  private provaLogin(data: boolean): void {
    if (data) {
      this.loginError = false;
      this.mangaHandler.listaManga = [];
      this.router.navigate(['/home']);
    } else {
      this.loginError = true;
    }
  }

  private getEmailRegistrata(): string | null {
    return (
      this.router.getCurrentNavigation()?.extras.state?.['message'] ?? null
    );
  }
}
