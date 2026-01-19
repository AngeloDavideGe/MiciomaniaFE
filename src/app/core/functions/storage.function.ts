import { DataHttp } from '../api/http.data';

export function refreshLocalStorage(): void {
  localStorage.setItem('lingua', JSON.stringify(DataHttp.lingua()));
  localStorage.setItem('user', JSON.stringify(DataHttp.user()));
  localStorage.setItem('postVisti', JSON.stringify(DataHttp.postVisti));
  localStorage.setItem('gruppiChat', JSON.stringify(DataHttp.gruppiChat));
}

export function refreshSessionStorage(): void {
  sessionStorage.setItem('mangaUtente', JSON.stringify(DataHttp.mangaUtente));
  sessionStorage.setItem(
    'punteggioOttenuto',
    JSON.stringify(DataHttp.punteggioOttenuto),
  );
  sessionStorage.setItem(
    'pubblicazioni',
    JSON.stringify(DataHttp.profiloPersonale),
  );
}
