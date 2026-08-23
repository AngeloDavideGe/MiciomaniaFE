import {
  Injectable,
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  inject,
} from '@angular/core';
import { createComponent } from '@angular/core';
import { LoadingComponent } from './loading.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private appRef = inject(ApplicationRef);
  private environmentInjector = inject(EnvironmentInjector);

  private loadingComponentRef: ComponentRef<LoadingComponent> | null = null;
  private counter: number = 0;

  show(): void {
    this.counter++;

    if (!this.loadingComponentRef) {
      this.loadingComponentRef = createComponent(LoadingComponent, {
        environmentInjector: this.environmentInjector,
      });
      this.appRef.attachView(this.loadingComponentRef.hostView);
      const domElem = (this.loadingComponentRef.hostView as any).rootNodes[0];
      document.body.appendChild(domElem);
    }
  }

  hide(): void {
    this.counter--;

    if (this.loadingComponentRef && this.counter <= 0) {
      this.appRef.detachView(this.loadingComponentRef.hostView);
      this.loadingComponentRef.destroy();
      this.loadingComponentRef = null;
    }
  }
}
