import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BaseService } from '../../../../../../../library/services/base.service';
import { getExtension } from '../functions/estenzione.function';
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
    super('CS');
  }

  getDropboxToken(): Observable<DropboxResponse> {
    return this.getCustom<DropboxResponse>('dropbox/get_access_token');
  }

  uploadFile(
    file: File,
    userId: string,
    oldLink: string,
    folderPath: string,
  ): Observable<any> {
    const nomeFile: string = `FileUtente.${getExtension(file)}`;
    const normalizedPath: string = `/${folderPath}/${userId}/${nomeFile}`;

    const headers: HttpHeaders = createHeaders(
      normalizedPath,
      this.dropboxResponse.access_token,
    );

    return readFileAsArrayBuffer(file).pipe(
      switchMap((fileContent: ArrayBuffer) => {
        return this.http.post(this.UPLOAD_URL, fileContent, { headers });
      }),
      switchMap(() => {
        return this.createSharedLink(normalizedPath, oldLink);
      }),
    );
  }

  private createSharedLink(path: string, oldLink: string): Observable<string> {
    if (oldLink) {
      return of(oldLink);
    }

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
