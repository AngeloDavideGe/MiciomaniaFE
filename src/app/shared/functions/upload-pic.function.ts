import { from, Observable, of, switchMap } from 'rxjs';
import { AppConfigService } from '../../core/api/appConfig.service';

export function uploadImage<T>(params: {
  appConfig: AppConfigService;
  client: 'c1' | 'c2';
  file: File;
  id: string | number;
  switchMapCall: (url: string) => Observable<T>;
}): Observable<T> {
  const fileExt: string | undefined = params.file.name.split('.').pop();
  const fileName: string = `${params.id}.${fileExt}`;

  return from(
    params.appConfig.client.storage
      .from('avatar')
      .upload(fileName, params.file, {
        upsert: true,
        contentType: params.file.type,
      })
  ).pipe(
    switchMap(() =>
      getLinkPic<T>({
        appConfig: params.appConfig,
        client: params.client,
        filePath: fileName,
        switchMapCall: params.switchMapCall,
      })
    )
  );
}

function getLinkPic<T>(params: {
  appConfig: AppConfigService;
  client: 'c1' | 'c2';
  filePath: string;
  switchMapCall: (url: string) => Observable<T>;
}): Observable<T> {
  const { data: publicData } = params.appConfig.client.storage
    .from('avatar')
    .getPublicUrl(params.filePath);

  return of(publicData.publicUrl + `?t=${Date.now()}`).pipe(
    switchMap((url: string) => params.switchMapCall(url))
  );
}
