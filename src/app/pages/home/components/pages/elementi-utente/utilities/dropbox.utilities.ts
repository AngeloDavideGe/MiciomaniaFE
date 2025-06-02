import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class DropboxUtilities {
  public createHeaders(
    normalizedPath: string,
    accessToken: string
  ): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/octet-stream',
      'Dropbox-API-Arg': JSON.stringify({
        path: normalizedPath,
        mode: { '.tag': 'add' },
        autorename: true,
        mute: false,
      }),
    });
  }

  public readFileAsArrayBuffer(file: File): Observable<ArrayBuffer> {
    return new Observable((observer) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          observer.next(reader.result);
          observer.complete();
        } else {
          observer.error(new Error('Tipo di risultato non supportato'));
        }
      };

      reader.onerror = (error) => {
        observer.error(new Error(`Errore nella lettura del file: ${error}`));
      };

      reader.readAsArrayBuffer(file);
    });
  }
}
