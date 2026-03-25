import { Type } from '@angular/core';
import { EditAdminComponent } from '../components/edit-admin/edit-admin.component';
import { GrigliaAdminComponent } from '../components/griglia-admin/griglia-admin.component';

export const admin_imports: Type<any>[] = [
  GrigliaAdminComponent,
  EditAdminComponent,
];
