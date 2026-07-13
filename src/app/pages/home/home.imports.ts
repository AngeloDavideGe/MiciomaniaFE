import { Type } from '@angular/core';
import { NavbarIndyComponent } from '../../../library/components/navbar/navbar-indy.component';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ToggleIndyComponent } from '../../../library/components/toggle/toggle-indy.component';
import { ContaierMicioComponent } from '../../shared/components/container-micio.component';
import { DescrizioneMicioComponent } from '../../shared/components/descrizione-micio.component';
import { CardIndyComponent } from '../../../library/components/card/card-indy.component';
import { SocialLinkComponent } from './components/ui/social-link/social-link.component';
import { FooterComponent } from './components/ui/footer/footer.component';

export const home_imports: Type<any>[] = [
  NavbarIndyComponent,
  ToggleIndyComponent,
  CardIndyComponent,
  ContaierMicioComponent,
  DescrizioneMicioComponent,
  SocialLinkComponent,
  FooterComponent,
  RouterOutlet,
  AsyncPipe,
];
