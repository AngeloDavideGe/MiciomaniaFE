import { AsyncPipe } from '@angular/common';
import { Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardIndyComponent } from '../../../library/components/card/card-indy.component';
import { CustomNavBarComponent } from '../../shared/components/navbar/navbar.component';
import { ToggleIndyComponent } from '../../../library/components/toggle/toggle-indy.component';
import { CursoreComponent } from './components/ui/cursore.component';
import { SocialLinkComponent } from './components/ui/social-link.component';

export const home_imports: Type<any>[] = [
  SocialLinkComponent,
  RouterOutlet,
  CursoreComponent,
  AsyncPipe,
  CustomNavBarComponent,
  CardIndyComponent,
  ToggleIndyComponent,
];
