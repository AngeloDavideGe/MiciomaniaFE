import { inject } from '@angular/core';
import { updateUserCustom } from '../../../../../../shared/handlers/auth.handler';
import { User } from '../../../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../../../shared/services/api/auth.service';
import { LoadingService } from '../../../../../../shared/services/template/loading.service';

export abstract class TabProfiloBase {
  protected authService = inject(AuthService);
  private loadingService = inject(LoadingService);

  protected updateUser(params: {
    user: User;
    updateCall: (user: User) => void;
  }): void {
    this.loadingService.show();
    updateUserCustom({
      authService: this.authService,
      user: params.user,
      finalizeFunc: () => this.loadingService.hide(),
    }).subscribe({
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
