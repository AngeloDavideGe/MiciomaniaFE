import { converUserParams } from '../../pages/home/functions/home.functions';
import { User, UserParams } from '../../shared/interfaces/users.interface';
import { AuthService } from '../../shared/services/api/auth.service';
import { DataHttp } from '../api/http.data';

export function refreshLocalStorage(): void {
  const localStorageUser = {
    lingua: DataHttp.lingua(),
    user: DataHttp.user(),
    allUsers: DataHttp.allUsers,
    postVisti: DataHttp.postVisti,
    gruppiChat: DataHttp.gruppiChat,
  };

  localStorage.setItem('userData', JSON.stringify(localStorageUser));
}

export function refreshSessionStorage(): void {
  if (DataHttp.user()?.id) {
    const sessionStorageUser = {
      mangaUtente: DataHttp.mangaUtente(),
      punteggioOttenuto: DataHttp.punteggioOttenuto,
      pubblicazioni: DataHttp.profiloPersonale,
    };

    sessionStorage.setItem(
      DataHttp.user()!.id,
      JSON.stringify(sessionStorageUser),
    );
  }
}

export function setUserDataNull(
  user: User,
  authService: AuthService,
  tipo: string,
): void {
  DataHttp.mangaUtente.set(null);
  DataHttp.initialMangaUtente = {} as any;
  DataHttp.profiloPersonale = null;
  DataHttp.punteggioOttenuto = 0;

  switch (tipo) {
    case 'new-login': {
      DataHttp.allUsers.push(user);
      authService.users.update((users: UserParams[]) =>
        users.map((x: UserParams) => {
          if (x.id == DataHttp.allUsers[0].id) {
            return converUserParams(DataHttp.user()!);
          } else {
            return x;
          }
        }),
      );
      DataHttp.user.set(user);
      break;
    }
    case 'logout': {
      DataHttp.allUsers = DataHttp.allUsers.filter(
        (userTemp: User) => userTemp.id != user.id,
      );
      if (DataHttp.allUsers.length > 0) {
        authService.users.update((users: UserParams[]) =>
          users.map((x: UserParams) => {
            if (x.id == DataHttp.allUsers[0].id) {
              return converUserParams(user);
            } else {
              return x;
            }
          }),
        );
        DataHttp.user.set(DataHttp.allUsers[0]);
      } else {
        authService.users.update((users: UserParams[]) => [
          ...users,
          converUserParams(user),
        ]);
        DataHttp.user.set(null);
      }
      break;
    }
    case 'login': {
      DataHttp.user.set(user);
      DataHttp.allUsers = [user];
      authService.users.update((users: UserParams[]) =>
        users.filter((x: UserParams) => x.id !== user.id),
      );
      break;
    }
  }
}
