import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { DropboxUtilities } from '../utilities/dropbox.utilities';
import { DropboxResponse } from '../interfaces/dropbox.interface';

@Injectable({
  providedIn: 'root',
})
export class DropboxService {
  public dropboxResponse: DropboxResponse = {} as DropboxResponse;
  private readonly UPLOAD_URL = 'https://content.dropboxapi.com/2/files/upload';
  private dropboxUtilities = new DropboxUtilities();

  constructor(private http: HttpClient) {
    this.loadTokenFromStorage();
  }

  getDropboxToken(): Observable<DropboxResponse> {
    const url = `${environment.urlBE}dropbox/get_access_token`;
    return this.http.get<DropboxResponse>(url, {
      headers: environment.headerRailway,
    });
  }

  uploadFile(
    file: File,
    folderPath: string = '',
    userId: string
  ): Observable<any> {
    return this.dropboxUtilities.readFileAsArrayBuffer(file).pipe(
      switchMap((fileContent) => {
        const headers = this.dropboxUtilities.createHeaders(
          folderPath,
          userId,
          file.name,
          this.dropboxResponse.access_token
        );
        return this.http.post(this.UPLOAD_URL, fileContent, { headers });
      })
    );
  }

  private loadTokenFromStorage(): void {
    const token = sessionStorage.getItem('dropbox_access_token');
    if (token) {
      this.dropboxResponse.access_token = token;
    }
  }
}
