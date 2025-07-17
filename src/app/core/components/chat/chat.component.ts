import { Component, inject, signal } from '@angular/core';
import { AuthHandler } from '../../../shared/handlers/auth.handler';
import { ChatGroupComponent } from './chat-group/chat-group.component';
import { ChatGroupService } from './services/chat-group.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatGroupComponent],
  template: `
    <!-- Chat aperta -->
    @if (chatAperta()) {
    <div
      class="position-fixed bottom-0 end-0 mb-3 me-3"
      style="width: 360px; height: 520px; z-index: 1080;"
    >
      <app-chat-group (chiudiChat)="chatAperta.set(false)"> </app-chat-group>
    </div>
    } @else {
    <div
      class="position-fixed bottom-0 end-0 mb-3 me-3 d-flex align-items-center rounded-pill shadow position-relative"
      style="
    background: linear-gradient(135deg,#fd5949 0%,#d6249f 50%,#285AEB 100%);
    color: #fff; cursor: pointer; padding: .5rem 1rem; z-index: 1080;
  "
      (click)="apriChat()"
    >
      <!-- icona Bootstrap Icons (opzionale) -->
      <div class="position-relative me-2">
        <i class="bi bi-chat-dots-fill fs-4"></i>
        @if(chatService.newMessages() > 0){
        <span
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          style="font-size: 0.75rem; padding: 0.35em 0.6em;"
        >
          {{ chatService.newMessages() }}
        </span>
        }
      </div>

      <span>Visualizza chat&nbsp;Miciomane</span>
    </div>

    }
  `,
})
export class ChatComponent {
  public chatAperta = signal<boolean>(false);
  public authHandler = inject(AuthHandler);
  public chatService = inject(ChatGroupService);

  public apriChat(): void {
    this.chatAperta.set(true);
    this.chatService.newMessages.set(0);
  }
}
