import { AsyncPipe } from '@angular/common';
import { Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardHomeComponent } from '../components/ui/card-home.component';
import { CercaProfiliComponent } from '../../posts/components/pages/ultimi-posts/components/cerca-profili/cerca-profili.component';
import { CursoreComponent } from '../components/ui/cursore.component';
import { MenuImpostazioniComponent } from '../components/ui/menu-impostazioni.component';
import { MenuProfiliComponent } from '../components/ui/menu-profili.component';
import { NavBarComponent } from '../components/ui/navbar.component';
import { SocialLinkComponent } from '../components/ui/social-link.component';

export const home_imports: Type<any>[] = [
  CardHomeComponent,
  SocialLinkComponent,
  CercaProfiliComponent,
  RouterOutlet,
  NavBarComponent,
  CursoreComponent,
  MenuImpostazioniComponent,
  MenuProfiliComponent,
  AsyncPipe,
];
