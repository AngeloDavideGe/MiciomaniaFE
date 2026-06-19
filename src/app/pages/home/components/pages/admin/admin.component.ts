import { Component } from '@angular/core';
import { DataHttp } from '../../../../../core/api/http.data';
import { User } from '../../../../../shared/interfaces/users.interface';
import { admin_imports } from './imports/admin.imports';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: admin_imports,
  template: `
    <app-custom-navbar></app-custom-navbar>

    <app-lista-admin [user]="user"></app-lista-admin>
  `,
})
export class AdminComponent {
  public user: User | null = DataHttp.user();
}
