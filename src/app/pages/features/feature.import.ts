import { Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarIndyComponent } from '../../../library/components/navbar/navbar-indy.component';
import { BottomNavbarComponent } from '../../../library/components/navbar-bottom/bottom-navbar-indy.component';
import { AsyncPipe } from '@angular/common';

export const feature_imports: Type<any>[] = [
  NavbarIndyComponent,
  BottomNavbarComponent,
  RouterOutlet,
  AsyncPipe,
];
