import { inject } from '@angular/core';
import { User } from '../interfaces/users.interface';
import { take } from 'rxjs';
import { Messaggio } from '../../core/components/chat/interfaces/chat-group.interface';
import { ChatGroupService } from '../../core/components/chat/services/chat-group.service';
import { AuthService } from '../services/auth.service';
import { NotificheService } from '../services/notifiche.service';

export class NotificheClass {
  private chatGroupService = inject(ChatGroupService);
  private notificheService = inject(NotificheService);
  private authService = inject(AuthService);

  private user = this.authService.getUser || ({} as User);

  public sottoscrizioneNotifiche(): void {
    this.chatGroupService.messages$.pipe(take(100)).subscribe({
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
