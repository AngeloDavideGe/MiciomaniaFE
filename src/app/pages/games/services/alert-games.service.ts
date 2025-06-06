import {
  Injectable,
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
} from '@angular/core';
import { createComponent } from '@angular/core';
import { AlertsGameComponent } from '../shared/alert-games.component';
import { EsitoGame } from '../interfaces/games.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AlertGamesService {
  private alertComponentRef: ComponentRef<AlertsGameComponent> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector
  ) {}

  alert(esito: EsitoGame): void {
    if (this.alertComponentRef) {
      this.destroyAlert();
    }

    this.alertComponentRef = createComponent(AlertsGameComponent, {
      environmentInjector: this.environmentInjector,
    });

    this.alertComponentRef.instance.esito = esito;

    this.appRef.attachView(this.alertComponentRef.hostView);
    const domElement: HTMLElement = (this.alertComponentRef.hostView as any)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElement);

    setTimeout(() => {
      this.destroyAlert();
    }, 1500);
  }

  private destroyAlert(): void {
    if (this.alertComponentRef) {
      this.appRef.detachView(this.alertComponentRef.hostView);
      this.alertComponentRef.destroy();
      this.alertComponentRef = null;
    }
  }
}
