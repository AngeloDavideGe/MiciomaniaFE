import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { AuthCustom } from '../../../../shared/custom/auth-custom.class';
import { usernameValidator } from '../../validators/username.validator';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent extends AuthCustom {
  public signInForm: FormGroup;
  public clickRegistrati: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    super();
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

  ngOnInit(): void {
    this.navigateOut({
      destroy$: this.destroy$,
      condUserForBack: true,
      userFunc: () => this.sottoscrizioneForm(),
    });
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
      .subscribe(() => {
        this.clickRegistrati = false;
      });
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
