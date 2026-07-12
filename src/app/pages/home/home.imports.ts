import { Type } from '@angular/core';
import { NavbarIndyComponent } from '../../../library/components/navbar/navbar-indy.component';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';

export const home_imports: Type<any>[] = [
  NavbarIndyComponent,
  RouterOutlet,
  AsyncPipe,
];
