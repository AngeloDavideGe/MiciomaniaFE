import { inject } from '@angular/core';
import { finalize, take } from 'rxjs';
import { User } from '../../../../../../shared/interfaces/users.interface';
import { LoadingService } from '../../../../../../shared/services/template/loading.service';
import { ProfiloHandler } from '../../../../handlers/profilo.handler';
import { AuthService } from '../../../../../../shared/services/api/auth.service';
import { updateUserCustom } from '../../../../../../shared/handlers/auth.handler';

export abstract class TabProfiloBase {
  protected authService = inject(AuthService);
  protected profiloHandler = inject(ProfiloHandler);
  private loadingService = inject(LoadingService);

  protected updateUser(params: {
    user: User;
    updateCall: (user: User) => void;
  }): void {
    this.loadingService.show();
    updateUserCustom({
      authService: this.authService,
      user: params.user,
    })
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe({
        next: () => params.updateCall(params.user),
        error: (err: string) =>
          this.errorEdit(err, 'Errore modifica del profilo'),
      });
  }

  private errorEdit(err: string, messaggio: string): void {
    alert(messaggio);
    console.error(messaggio, err);
  }
}
