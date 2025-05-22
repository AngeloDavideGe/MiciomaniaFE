import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Subject, take } from 'rxjs';
import { AuthCustom } from '../../shared/custom/auth-custom.class';
import { MangaService } from '../manga/services/manga.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterOutlet],
  templateUrl: './login.component.html',
})
export class LoginComponent extends AuthCustom implements OnInit {
  public loginForm: FormGroup;
  public loginError = false;
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private mangaService: MangaService
  ) {
    super();
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

  ngOnInit(): void {
    this.navigateOut({
      condUserForBack: true,
      destroy$: this.destroy$,
      userFunc: () => {},
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
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
      this.mangaService.resettaMangaUtente();
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
