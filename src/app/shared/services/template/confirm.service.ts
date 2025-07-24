import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Injectable,
} from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { ConfirmComponent } from '../../components/confirm.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  private confirmComponentRef: ComponentRef<ConfirmComponent> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector
  ) {}

  confirm(confirmParams: ConfirmParams): Observable<boolean> {
    if (this.confirmComponentRef) {
      this.destroyConfirmComponent();
    }

    this.confirmComponentRef = createComponent(ConfirmComponent, {
      environmentInjector: this.environmentInjector,
    });

    this.confirmComponentRef.instance.params = {
      title: confirmParams.title,
      message: confirmParams.message,
      buttonNo: confirmParams.buttonNo || 'No',
      buttonSi: confirmParams.buttonSi || 'Si',
    };

    document.body.appendChild(this.confirmComponentRef.location.nativeElement);
    this.appRef.attachView(this.confirmComponentRef.hostView);

    return this.confirmComponentRef.instance
      .getResultObservable()
      .pipe(finalize(() => this.destroyConfirmComponent()));
  }

  private destroyConfirmComponent(): void {
    if (this.confirmComponentRef) {
      this.appRef.detachView(this.confirmComponentRef.hostView);
      this.confirmComponentRef.destroy();
      this.confirmComponentRef = null;
    }
  }
}

interface ConfirmParams {
  title: string;
  message: string;
  buttonNo?: string;
  buttonSi?: string;
}
