import { DataHttp } from '../api/http.data';

export function refreshLocalStorage(): void {
  localStorage.setItem('listaManga', JSON.stringify(DataHttp.listaManga()));
  localStorage.setItem('mangaUtente', JSON.stringify(DataHttp.mangaUtente));
  localStorage.setItem('user', JSON.stringify(DataHttp.user()));
  localStorage.setItem(
    'canzoniMiciomani',
    JSON.stringify(DataHttp.canzoniMiciomani)
  );
  localStorage.setItem(
    'mangaMiciomani',
    JSON.stringify(DataHttp.mangaMiciomani)
  );
}

export function refreshSessionStorage(): void {
  sessionStorage.setItem('users', JSON.stringify(DataHttp.users()));
  sessionStorage.setItem('socialLinks', JSON.stringify(DataHttp.social));
  sessionStorage.setItem('mangaAperti', JSON.stringify(DataHttp.mangaAperti));
  sessionStorage.setItem(
    'elementiUtente',
    JSON.stringify(DataHttp.elementiUtente)
  );
  sessionStorage.setItem(
    'mangaCaricati',
    JSON.stringify(DataHttp.mangaScaricati)
  );
  sessionStorage.setItem(
    'mangaMiciomaniLoaded',
    JSON.stringify(DataHttp.mangaMiciomaniLoaded)
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
