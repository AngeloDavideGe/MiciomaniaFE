import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../../../../library/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class DropboxService extends BaseService {
  constructor() {
    super('CS');
  }

  uploadFile(
    file: File,
    userId: string,
    folderPath: string,
    oldLink?: string,
  ): Observable<{ url: string }> {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('userId', userId);
    formData.append('folderPath', folderPath);

    if (oldLink) {
      formData.append('oldLink', oldLink);
    }

    return this.postCustom<{ url: string }>('dropbox/upload', {
      body: formData,
    });
  }
}
