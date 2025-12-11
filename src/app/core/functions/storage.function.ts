import { DataHttp } from '../api/http.data';

export function refreshLocalStorage(): void {
  localStorage.setItem('lingua', JSON.stringify(DataHttp.lingua()));
  localStorage.setItem('listaManga', JSON.stringify(DataHttp.listaManga()));
  localStorage.setItem('mangaUtente', JSON.stringify(DataHttp.mangaUtente));
  localStorage.setItem('user', JSON.stringify(DataHttp.user()));
  localStorage.setItem('postVisti', JSON.stringify(DataHttp.postVisti));
  localStorage.setItem('gruppiChat', JSON.stringify(DataHttp.gruppiChat));
}

export function refreshSessionStorage(): void {
  sessionStorage.setItem('users', JSON.stringify(DataHttp.users()));
  sessionStorage.setItem('socialLinks', JSON.stringify(DataHttp.social));
  sessionStorage.setItem(
    'elementiUtente',
    JSON.stringify(DataHttp.elementiUtente)
  );
  sessionStorage.setItem(
    'mangaCaricati',
    JSON.stringify(DataHttp.mangaScaricati)
  );
  sessionStorage.setItem(
    'punteggioOttenuto',
    JSON.stringify(DataHttp.punteggioOttenuto)
  );
  sessionStorage.setItem(
    'pubblicazioni',
    JSON.stringify(DataHttp.profiloPersonale)
  );
}
