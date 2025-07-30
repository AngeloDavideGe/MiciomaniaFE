import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { DataHttp } from '../../../../core/api/http.data';
import { mapUserByDb } from '../../../../shared/handlers/functions/user.function';
import { AuthService } from '../../../../shared/services/api/auth.service';
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

  private authService = inject(AuthService);
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

    this.login(this.f['email'].value, this.f['password'].value).subscribe({
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
      DataHttp.listaManga = [];
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

  private login(email: string, password: string): Observable<boolean> {
    return this.authService.getUserByEmailAndPassword(email, password).pipe(
      take(1),
      map((data) => {
        if (data.length === 1) {
          const user = mapUserByDb(data[0]);
          DataHttp.users.set(DataHttp.users().filter((x) => x.id != user.id));
          DataHttp.user.set(user);
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
