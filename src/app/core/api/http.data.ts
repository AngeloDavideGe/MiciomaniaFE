import { signal, WritableSignal } from '@angular/core';
import { User, UserParams } from '../../shared/interfaces/users.interface';

export class DataHttp {
  public static user: WritableSignal<User | null> = signal<User | null>(null);
  public static users: WritableSignal<UserParams[]> = signal<UserParams[]>([]);

  static loadDataHttp(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      DataHttp.user.set(JSON.parse(userData));
    }

    const usersData = sessionStorage.getItem('users');
    if (usersData) {
      DataHttp.users.set(JSON.parse(usersData));
    }
  }
}
