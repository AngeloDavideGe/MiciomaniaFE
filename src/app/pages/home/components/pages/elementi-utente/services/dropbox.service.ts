import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../../../../environments/environment';
import { DropboxUtilities } from '../utilities/dropbox.utilities';
import { DropboxResponse } from '../interfaces/dropbox.interface';

@Injectable({
  providedIn: 'root',
})
export class DropboxService {
  public dropboxResponse: DropboxResponse = {} as DropboxResponse;
  private readonly UPLOAD_URL = 'https://content.dropboxapi.com/2/files/upload';
  private dropboxUtilities = new DropboxUtilities();

  constructor(private http: HttpClient) {}

  getDropboxToken(): Observable<DropboxResponse> {
    const url = `${environment.urlBE}dropbox/get_access_token`;
    return this.http.get<DropboxResponse>(url, {
      headers: environment.headerBEMiciomania,
    });
  }

  uploadFile(
    file: File,
    folderPath: string = '',
    userId: string
  ): Observable<any> {
    const normalizedPath = `/${folderPath}/${userId}/${file.name}`;

    const headers = this.dropboxUtilities.createHeaders(
      normalizedPath,
      this.dropboxResponse.access_token
    );

    return this.dropboxUtilities.readFileAsArrayBuffer(file).pipe(
      switchMap((fileContent) => {
        return this.http.post(this.UPLOAD_URL, fileContent, { headers });
      }),
      switchMap(() => {
        return this.createSharedLink(normalizedPath);
      })
    );
  }

  private createSharedLink(path: string): Observable<string> {
    const url =
      'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.dropboxResponse.access_token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      path: path,
      settings: {
        requested_visibility: 'public',
      },
    };

    return this.http
      .post<any>(url, body, { headers })
      .pipe(map((res) => res.url));
  }
}
