import { inject } from '@angular/core';
import { AuthHandler } from '../../shared/handlers/auth.handler';
import { UserParams } from '../../shared/interfaces/users.interface';

export class UsersMapClass {
  private authHandler = inject(AuthHandler);

  public usersSubjectSubscription(): void {
    this.authHandler.users$.subscribe({
      next: (users) =>
        (this.authHandler.userMessageMap = this.mapUserMessage(users)),
    });
  }

  private mapUserMessage(users: UserParams[]): {
    [id: string]: { nome: string; pic: string };
  } {
    return users.reduce((map, utente) => {
      if (utente) {
        map[utente.id] = {
          nome: utente.nome || '',
          pic: utente.profilePic || '',
        };
      } else {
        map[utente] = {
          nome: 'Anonimo',
          pic: 'https://png.pngtree.com/png-vector/20191009/ourlarge/pngtree-user-icon-png-image_1796659.jpg',
        };
      }
      return map;
    }, {} as { [id: string]: { nome: string; pic: string } });
  }
}
