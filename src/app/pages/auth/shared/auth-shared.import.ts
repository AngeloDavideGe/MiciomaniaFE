import { NgClass } from '@angular/common';
import { Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export const auth_shared_imports: Type<any>[] = [
  ReactiveFormsModule,
  RouterLink,
  NgClass,
];
