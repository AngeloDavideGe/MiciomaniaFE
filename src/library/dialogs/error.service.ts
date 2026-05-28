import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorParams } from '../interfaces/error.interface';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private route = inject(Router);
  public error = signal<ErrorParams | null>(null);

  public showError(params: ErrorParams): void {
    this.error.set(params);
    this.route.navigate(['/error-page']);
  }
}
