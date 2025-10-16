import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BaseService } from '../../../../../../shared/services/base/base.service';
import { DropboxResponse } from '../interfaces/dropbox.interface';
import {
  createHeaders,
  readFileAsArrayBuffer,
} from '../utilities/dropbox.utilities';

@Injectable({
  providedIn: 'root',
})
export class DropboxService extends BaseService {
  public dropboxResponse: DropboxResponse = {} as DropboxResponse;
  private readonly UPLOAD_URL: string =
    'https://content.dropboxapi.com/2/files/upload';

  constructor() {
    super('BE');
  }

  getDropboxToken(): Observable<DropboxResponse> {
    const params = new HttpParams();
    return this.getCustom<DropboxResponse>('dropbox/get_access_token', params);
  }

  uploadFile(
    file: File,
    folderPath: string = '',
    userId: string
  ): Observable<any> {
    const normalizedPath: string = `/${folderPath}/${userId}/${file.name}`;

    const headers: HttpHeaders = createHeaders(
      normalizedPath,
      this.dropboxResponse.access_token
    );

    return readFileAsArrayBuffer(file).pipe(
      switchMap((fileContent: ArrayBuffer) => {
        return this.http.post(this.UPLOAD_URL, fileContent, { headers });
      }),
      switchMap(() => {
        return this.createSharedLink(normalizedPath);
      })
    );
  }

  private createSharedLink(path: string): Observable<string> {
    const url: string =
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
