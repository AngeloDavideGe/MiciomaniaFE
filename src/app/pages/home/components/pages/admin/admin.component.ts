import { Component, signal } from '@angular/core';
import { NavBarButton } from '../../../../../../library/interfaces/navbar.interface';
import { DataHttp } from '../../../../../core/api/http.data';
import { User } from '../../../../../shared/interfaces/users.interface';
import { admin_imports } from './admin.imports';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: admin_imports,
  template: `
    <app-custom-navbar
      [altriBottoni]="pulsanti"
      [selected]="selecTab"
    ></app-custom-navbar>

    @switch (selecTab()) {
      @case ('Lista Admin') {
        <app-lista-admin [user]="user"></app-lista-admin>
      }
      @case ('Cron') {
        <app-cron-admin></app-cron-admin>
      }
    }
  `,
})
export class AdminComponent {
  public user: User | null = DataHttp.user();
  public selecTab = signal<'Lista Admin' | 'Cron'>('Lista Admin');

  public pulsanti: NavBarButton[] = [
    {
      icon: 'bi bi-person',
      title: 'Lista Admin',
      action: () => this.selecTab.set('Lista Admin'),
    },
    {
      icon: 'bi bi-person',
      title: 'Cron',
      action: () => this.selecTab.set('Cron'),
    },
  ];
}
