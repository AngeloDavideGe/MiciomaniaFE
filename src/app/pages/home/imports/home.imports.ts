import { AsyncPipe } from '@angular/common';
import { Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardHomeComponent } from '../components/ui/card-home.component';
import { CursoreComponent } from '../components/ui/cursore.component';
import { MenuImpostazioniComponent } from '../components/ui/menu-impostazioni.component';
import { MenuProfiliComponent } from '../components/ui/menu-profili.component';
import { HomeNavBarComponent } from '../components/ui/home-navbar.component';
import { SocialLinkComponent } from '../components/ui/social-link.component';

export const home_imports: Type<any>[] = [
  CardHomeComponent,
  SocialLinkComponent,
  RouterOutlet,
  HomeNavBarComponent,
  CursoreComponent,
  MenuImpostazioniComponent,
  MenuProfiliComponent,
  AsyncPipe,
];
