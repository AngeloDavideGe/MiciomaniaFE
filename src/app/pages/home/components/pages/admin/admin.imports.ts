import { Type } from '@angular/core';
import { CustomNavBarComponent } from '../../../../../../library/components/navbar/navbar.component';
import { ListaAdminComponent } from './components/pages/lista-admin/lista-admin.component';
import { CronAdminComponent } from './components/pages/cron-admin/cron-admin.component';

export const admin_imports: Type<any>[] = [
  ListaAdminComponent,
  CustomNavBarComponent,
  CronAdminComponent,
];
