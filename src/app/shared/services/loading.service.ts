import {
  Injectable,
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
} from '@angular/core';
import { createComponent } from '@angular/core';
import { LoadingComponent } from '../components/loading.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingComponentRef: ComponentRef<LoadingComponent> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector
  ) {}

  show(): void {
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
    if (this.loadingComponentRef) {
      this.appRef.detachView(this.loadingComponentRef.hostView);
      this.loadingComponentRef.destroy();
      this.loadingComponentRef = null;
    }
  }
}
