import { Component, signal } from '@angular/core';
import { DataHttp } from '../../../../../core/api/http.data';
import { Lingua } from '../../../../../shared/interfaces/http.interface';
import { User } from '../../../../../shared/interfaces/users.interface';
import { admin_imports } from './imports/admin.imports';
import {
  AdminLang,
  AdminLangType,
} from './languages/interfaces/admin-lang.interface';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: admin_imports,
  template: `
    <app-custom-navbar></app-custom-navbar>

    @if (adminLang()) {
      <app-lista-admin
        [adminLang]="adminLang()!"
        [user]="user"
      ></app-lista-admin>
    }
  `,
})
export class AdminComponent {
  public user: User | null = DataHttp.user();
  public adminLang = signal<AdminLang | null>(null);

  constructor() {
    const lingua: Lingua = DataHttp.lingua();
    const languageMap: Record<Lingua, () => Promise<AdminLangType>> = {
      it: () => import('./languages/constants/admin-it.constant'),
      en: () => import('./languages/constants/admin-en.constant'),
    };
    languageMap[lingua]().then((m) => this.adminLang.set(m.adminLang));
  }
}
