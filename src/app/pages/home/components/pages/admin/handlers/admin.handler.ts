import { finalize, take } from 'rxjs';
import { Ruolo } from '../../../../../../shared/enums/users.enum';
import { AuthService } from '../../../../../../shared/services/api/auth.service';
import { LoadingService } from '../../../../../../shared/services/template/loading.service';

export function updateRuoloUtenteCustom(params: {
  authService: AuthService;
  loadingService: LoadingService;
  userId: string;
  ruolo: Ruolo;
  nextCall: Function;
}): void {
  params.loadingService.show();

  params.authService
    .updateRuoloUtente(params.userId, params.ruolo)
    .pipe(
      take(1),
      finalize(() => params.loadingService.hide())
    )
    .subscribe({
      next: () => params.nextCall(),
      error: (error) =>
        console.error("Errore durante l'aggiornamento del ruolo:", error),
    });
}
