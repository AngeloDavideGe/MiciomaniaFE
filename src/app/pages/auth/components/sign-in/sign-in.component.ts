import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, take, takeUntil } from 'rxjs';
import { auth_shared_imports } from '../../shared/auth-shared.import';
import { usernameValidator } from '../../validators/username.validator';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/api/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: auth_shared_imports,
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements AfterViewInit, OnDestroy {
  public signInForm: FormGroup;
  public clickRegistrati: boolean = false;
  private destroy$ = new Subject<void>();

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      username: [
        '',
        [Validators.required, Validators.minLength(3), usernameValidator()],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.signInForm.controls;
  }

  ngAfterViewInit(): void {
    this.sottoscrizioneForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.authService
        .postUser(
          this.f['nome'].value,
          this.f['username'].value,
          this.f['email'].value,
          this.f['password'].value
        )
        .pipe(take(1))
        .subscribe({
          next: (data) => this.nextSignIn(data),
          error: (error) => console.error('errore nel sign-in', error),
        });
    } else {
      this.clickRegistrati = true;
    }
  }

  private sottoscrizioneForm(): void {
    this.signInForm.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => (this.clickRegistrati = false));
  }

  private nextSignIn(data: any): void {
    if (data.user) {
      this.router.navigate(['/auth/login'], {
        state: { message: this.f['email'].value },
      });
    } else {
      alert(data.error);
    }
  }
}
