import { inject } from '@angular/core';
import { Messaggio } from '../../core/components/chat/interfaces/chat-group.interface';
import { ChatGroupService } from '../../core/components/chat/services/chat-group.service';
import { User } from '../interfaces/users.interface';
import { NotificheService } from '../services/notifiche.service';
import { AuthHandler } from '../handlers/auth.handler';

export class NotificheClass {
  private chatGroupService = inject(ChatGroupService);
  private notificheService = inject(NotificheService);
  private authHandler = inject(AuthHandler);

  private user = this.authHandler.user() || ({} as User);

  public sottoscrizioneNotifiche(): void {
    this.chatGroupService.messages$.subscribe({
      next: (data) => {
        const ultimoMessaggio: Messaggio =
          data[data.length - 1] || ({} as Messaggio);
        if (
          ultimoMessaggio?.sender != this.user.id &&
          this.chatGroupService.messaggiCaricatiBool
        ) {
          this.notificheService.show(
            ultimoMessaggio.sender,
            ultimoMessaggio.content
          );
        }
      },
    });
  }
}
