import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../../../../environments/environment';
import { DropboxResponse } from '../interfaces/dropbox.interface';
import {
  createHeaders,
  readFileAsArrayBuffer,
} from '../utilities/dropbox.utilities';
import { AppConfigService } from '../../../../../../core/api/appConfig.service';

@Injectable({
  providedIn: 'root',
})
export class DropboxService {
  private appConfig = inject(AppConfigService);
  public dropboxResponse: DropboxResponse = {} as DropboxResponse;
  private readonly UPLOAD_URL = 'https://content.dropboxapi.com/2/files/upload';

  constructor(private http: HttpClient) {}

  getDropboxToken(): Observable<DropboxResponse> {
    const url = `${environment.urlBE}dropbox/get_access_token`;
    const header = new HttpHeaders({
      apikey: this.appConfig.config.BE.key,
      Authorization: `Bearer ${this.appConfig.config.BE.key}`,
    });
    return this.http.get<DropboxResponse>(url, {
      headers: header,
    });
  }

  uploadFile(
    file: File,
    folderPath: string = '',
    userId: string
  ): Observable<any> {
    const normalizedPath = `/${folderPath}/${userId}/${file.name}`;

    const headers = createHeaders(
      normalizedPath,
      this.dropboxResponse.access_token
    );

    return readFileAsArrayBuffer(file).pipe(
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
