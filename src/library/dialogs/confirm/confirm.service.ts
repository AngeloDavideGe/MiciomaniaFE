import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
} from '@angular/core';
import { Observable } from 'rxjs';
import { callHttpFunc, handlerFunc } from '../../functions/handler.function';
import { ConfirmComponent, ConfirmParams } from './confirm.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  private appRef = inject(ApplicationRef);
  private environmentInjector = inject(EnvironmentInjector);

  private confirmComponentRef: ComponentRef<ConfirmComponent> | null = null;

  public confirmCustom(params: {
    titolo: string;
    messaggio: string;
    buttonNo?: string;
    buttonSi?: string;
    confirmFunc: Function;
    notConfirmFunc: Function;
  }): void {
    handlerFunc<boolean>({
      callHttp: () =>
        this.confirm({
          title: params.titolo,
          message: params.messaggio,
          buttonNo: params.buttonNo || 'No',
          buttonSi: params.buttonSi || 'Si',
        }),
      nextCall: (result: boolean) => {
        if (result) {
          params.confirmFunc();
        } else {
          params.notConfirmFunc();
        }
      },
    });
  }

  private confirm(confirmParams: ConfirmParams): Observable<boolean> {
    if (this.confirmComponentRef) {
      this.destroyConfirmComponent();
    }

    this.confirmComponentRef = createComponent(ConfirmComponent, {
      environmentInjector: this.environmentInjector,
    });

    this.confirmComponentRef.instance.params.set({
      title: confirmParams.title,
      message: confirmParams.message,
      buttonNo: confirmParams.buttonNo,
      buttonSi: confirmParams.buttonSi,
    });

    document.body.appendChild(this.confirmComponentRef.location.nativeElement);
    this.appRef.attachView(this.confirmComponentRef.hostView);

    return callHttpFunc<boolean>({
      callHttp: () => this.confirmComponentRef!.instance.getResultObservable(),
      finalizeCall: () => this.destroyConfirmComponent(),
    });
  }

  private destroyConfirmComponent(): void {
    if (this.confirmComponentRef) {
      this.appRef.detachView(this.confirmComponentRef.hostView);
      this.confirmComponentRef.destroy();
      this.confirmComponentRef = null;
    }
  }
}
