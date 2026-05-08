import { Type } from '@angular/core';
import { EditAdminComponent } from '../components/edit-admin/edit-admin.component';
import { GrigliaAdminComponent } from '../components/griglia-admin/griglia-admin.component';
import { CustomNavBarComponent } from '../../../../../../../library/components/navbar/navbar.component';

export const admin_imports: Type<any>[] = [
  GrigliaAdminComponent,
  EditAdminComponent,
  CustomNavBarComponent,
];
