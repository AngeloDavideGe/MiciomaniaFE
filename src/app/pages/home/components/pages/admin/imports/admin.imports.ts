import { NgIf, NgFor } from '@angular/common';
import { EditAdminComponent } from '../components/edit-admin/edit-admin.component';
import { TableUserParamsComponent } from '../components/table-user-params/table-user-params.component';
import { CapitalizeFirstLetterPipe } from '../pipes/capitalize.pipe';

export const admin_imports = [
  NgIf,
  NgFor,
  TableUserParamsComponent,
  CapitalizeFirstLetterPipe,
  EditAdminComponent,
];
