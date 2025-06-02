import { inject } from '@angular/core';
import { AuthService } from '../../../../../../shared/services/auth.service';
import { ProfiloService } from '../../../../services/profilo.service';
import { User } from '../../../../../../shared/interfaces/users.interface';
import { finalize, take } from 'rxjs';
import { LoadingService } from '../../../../../../shared/services/loading.service';

export abstract class TabProfiloCustom {
  protected authService = inject(AuthService);
  protected profiloService = inject(ProfiloService);
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
