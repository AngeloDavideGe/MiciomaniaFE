import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { ProfiloService } from '../../pages/home/services/profilo.service';
import {
  Credenziali,
  Iscrizione,
  Profile,
  User,
  UserParams,
} from '../interfaces/users.interface';
import { AuthService } from '../services/auth.service';
import { ConfirmService } from '../services/confirm.service';

export abstract class AuthCustom {
  protected confirmService = inject(ConfirmService);
  protected authService = inject(AuthService);
  protected profiloService = inject(ProfiloService);
  protected router = inject(Router);

  protected sottoscrizioneUtenti(params: {
    nextCall: (data: UserParams[]) => void;
  }): void {
    this.authService
      .getAllUsersHttp()
      .pipe(
        take(1),
        finalize(() => (this.authService.profiliPronti = true))
      )
      .subscribe({
        next: (data) => params.nextCall(data),
        error: (error) => {
          console.error('errore nella lista utenti', error);
        },
      });
  }

  protected navigateOut(params: {
    condUserForBack: boolean;
    userFunc: () => void;
  }): void {
    const user = this.authService.user();
    const result = params.condUserForBack ? !!user : !user;

    if (result) {
      this.router.navigate(['home']);
    } else {
      params.userFunc();
    }
  }

  protected confirmCustom(params: {
    titolo: string;
    messaggio: string;
    buttonNo?: string;
    buttonSi?: string;
    confirmFunc: Function;
  }): void {
    this.confirmService
      .confirm({
        title: params.titolo,
        message: params.messaggio,
        buttonNo: params.buttonNo || 'No',
        buttonSi: params.buttonSi || 'Si',
      })
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          params.confirmFunc();
        }
      });
  }

  protected converUserParams(user: User): UserParams {
    return {
      id: user.id,
      nome: user.credenziali.nome,
      profilePic: user.credenziali.profilePic,
      ruolo: user.credenziali.ruolo,
    } as UserParams;
  }

  protected getVoidUser(): User {
    return {
      credenziali: {} as Credenziali,
      profile: {} as Profile,
      iscrizione: {} as Iscrizione,
    } as User;
  }
}
