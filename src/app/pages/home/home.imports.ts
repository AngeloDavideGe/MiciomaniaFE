import { AsyncPipe } from '@angular/common';
import { Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardCustomComponent } from '../../../library/components/card/card.component';
import { CustomNavBarComponent } from '../../../library/components/navbar/navbar.component';
import { ToggleCustomComponent } from '../../../library/components/toggle/toggle.component';
import { CursoreComponent } from './components/ui/cursore.component';
import { SocialLinkComponent } from './components/ui/social-link.component';

export const home_imports: Type<any>[] = [
  SocialLinkComponent,
  RouterOutlet,
  CursoreComponent,
  AsyncPipe,
  CustomNavBarComponent,
  CardCustomComponent,
  ToggleCustomComponent,
];
