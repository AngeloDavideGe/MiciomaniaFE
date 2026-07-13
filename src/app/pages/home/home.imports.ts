import { Type } from '@angular/core';
import { NavbarIndyComponent } from '../../../library/components/navbar/navbar-indy.component';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ToggleIndyComponent } from '../../../library/components/toggle/toggle-indy.component';
import { ContaierMicioComponent } from '../../shared/components/container-micio.component';
import { DescrizioneMicioComponent } from '../../shared/components/descrizione-micio.component';

export const home_imports: Type<any>[] = [
  NavbarIndyComponent,
  ToggleIndyComponent,
  ContaierMicioComponent,
  DescrizioneMicioComponent,
  RouterOutlet,
  AsyncPipe,
];
