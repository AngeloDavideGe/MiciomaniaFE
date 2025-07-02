import { NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AuthHandler } from '../../../shared/handlers/auth.handler';
import { ChatGroupComponent } from './chat-group/chat-group.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatGroupComponent, NgIf],
  template: `
    <!-- Chat aperta -->
    <ng-container *ngIf="chatAperta(); else chatGroupTemplate">
      <div
        class="position-fixed bottom-0 end-0 mb-3 me-3"
        style="width: 360px; height: 520px; z-index: 1080;"
      >
        <app-chat-group
          [authHandler]="authHandler"
          (chiudiChat)="chatAperta.set(false)"
        >
        </app-chat-group>
      </div>
    </ng-container>

    <!-- Chat chiusa -->
    <ng-template #chatGroupTemplate>
      <div
        class="position-fixed bottom-0 end-0 mb-3 me-3 d-flex align-items-center rounded-pill shadow"
        style="
          background: linear-gradient(135deg,#fd5949 0%,#d6249f 50%,#285AEB 100%);
          color:#fff; cursor:pointer; padding:.5rem 1rem; z-index:1080;
        "
        (click)="chatAperta.set(true)"
      >
        <!-- icona Bootstrap Icons (opzionale) -->
        <i class="bi bi-chat-dots-fill me-2"></i>
        <span>Visualizza chat&nbsp;Miciomane</span>
      </div>
    </ng-template>
  `,
})
export class ChatComponent {
  public chatAperta = signal<boolean>(false);
  public authHandler = inject(AuthHandler);
}
