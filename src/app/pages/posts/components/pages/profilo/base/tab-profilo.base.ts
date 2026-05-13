import { inject } from '@angular/core';
import { updateUserCustom } from '../../../../../../shared/handlers/auth.handler';
import { User } from '../../../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../../../shared/services/api/auth.service';

export abstract class TabProfiloBase {
  protected authService = inject(AuthService);

  protected updateUser(params: {
    user: User;
    updateCall: (user: User) => void;
  }): void {
    updateUserCustom({
      authService: this.authService,
      user: params.user,
      finalizeFunc: () => {},
      context: true,
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
