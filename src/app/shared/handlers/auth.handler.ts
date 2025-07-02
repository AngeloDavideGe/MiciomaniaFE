import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, filter, finalize, shareReplay, take } from 'rxjs';
import {
  Credenziali,
  Iscrizione,
  Profile,
  User,
  UserParams,
} from '../interfaces/users.interface';
import { AuthService } from '../services/auth.service';
import { ConfirmService } from '../services/confirm.service';
import { UserUtilities } from '../utilities/user-utilities.class';
import { ProfiloHandler } from '../../pages/home/handlers/profilo.handler';

@Injectable({
  providedIn: 'root',
})
export class AuthHandler {
  public confirmService = inject(ConfirmService);
  public authService = inject(AuthService);
  public profiloHandler = inject(ProfiloHandler);

  // Utente corrente
  public user = signal<User | null>(null);
  // Lista di utenti (eccezione per l'utente corrente)
  private muteUsers = false;
  private usersSubject = new BehaviorSubject<UserParams[]>([]);
  public users$ = this.usersSubject.asObservable().pipe(
    filter(() => !this.muteUsers),
    shareReplay(1)
  );
  // Altri
  public profiliPronti: boolean = false;
  public userMessageMap: { [id: string]: { nome: string; pic: string } } = {};
  private userUtilities = new UserUtilities();

  get getUsers(): UserParams[] {
    return this.usersSubject.getValue();
  }

  set setUsers(users: UserParams[]) {
    this.usersSubject.next(users);
  }

  set setMuteUsers(users: UserParams[]) {
    this.muteUsers = true;
    this.usersSubject.next(users);
    this.muteUsers = false;
  }

  constructor() {
    this.userUtilities.loadUserFromStorage(this.user, this.getUsers);
    this.profiliPronti = this.getUsers.length > 0;
  }

  public sottoscrizioneUtenti(params: {
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

  public confirmCustom(params: {
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

  public converUserParams(user: User): UserParams {
    return {
      id: user.id,
      nome: user.credenziali.nome,
      profilePic: user.credenziali.profilePic,
      ruolo: user.credenziali.ruolo,
    } as UserParams;
  }

  public getVoidUser(): User {
    return {
      credenziali: {} as Credenziali,
      profile: {} as Profile,
      iscrizione: {} as Iscrizione,
    } as User;
  }
}
