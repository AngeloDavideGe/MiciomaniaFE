import { inject } from '@angular/core';
import { finalize, take } from 'rxjs';
import { User } from '../../../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../../../shared/services/auth.service';
import { LoadingService } from '../../../../../../shared/services/loading.service';
import { ProfiloHandler } from '../../../../handlers/profilo.handler';

export abstract class TabProfiloBase {
  protected authService = inject(AuthService);
  protected profiloHandler = inject(ProfiloHandler);
  private loadingService = inject(LoadingService);

  protected updateUser(params: {
    user: User;
    updateCall: (user: User) => void;
  }): void {
    this.loadingService.show();
    this.authService
      .updateUser(params.user)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe({
        next: () => params.updateCall(params.user),
        error: (err) =>
          this.errorEdit(err, 'Errore nella modifica del profilo'),
      });
  }

  private errorEdit(err: string, messaggio: string): void {
    alert(messaggio);
    console.error(messaggio, err);
  }
}
