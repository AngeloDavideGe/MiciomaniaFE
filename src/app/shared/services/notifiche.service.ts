import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Injectable,
} from '@angular/core';
import { NotificheComponent } from '../components/notifiche.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NotificheService {
  private notificheComponent: ComponentRef<NotificheComponent> | null = null;
  private timeoutId: any;

  constructor(
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector,
    private router: Router
  ) {}

  show(sender: string, content: string): void {
    if (!this.notificheComponent) {
      this.notificheComponent = createComponent(NotificheComponent, {
        environmentInjector: this.environmentInjector,
      });

      this.notificheComponent.setInput('sender', sender);
      this.notificheComponent.setInput('content', content);

      this.appRef.attachView(this.notificheComponent.hostView);
      const domElem = (this.notificheComponent.hostView as any).rootNodes[0];
      document.body.appendChild(domElem);

      this.timeoutId = setTimeout(() => this.hide(), 3000);

      domElem.addEventListener('click', () =>
        this.router.navigate(['/chat-group'])
      );
    }
  }

  private hide(): void {
    if (this.notificheComponent) {
      clearTimeout(this.timeoutId);
      this.appRef.detachView(this.notificheComponent.hostView);
      this.notificheComponent.destroy();
      this.notificheComponent = null;
    }
  }
}
