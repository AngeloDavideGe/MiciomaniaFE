import { AsyncPipe } from '@angular/common';
import { Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomNavBarComponent } from '../../../../library/components/navbar/navbar.component';
import { CursoreComponent } from '../components/ui/cursore.component';
import { HomeToggleComponent } from '../components/ui/home-toggle.component';
import { MenuImpostazioniComponent } from '../components/ui/menu-impostazioni.component';
import { MenuProfiliComponent } from '../components/ui/menu-profili.component';
import { SocialLinkComponent } from '../components/ui/social-link.component';
import { UserActiveComponent } from '../components/ui/user-active.component';
import { NotificheComponent } from '../components/ui/notifiche.component';
import { CardCustomComponent } from '../../../../library/components/card/card.component';

export const home_imports: Type<any>[] = [
  SocialLinkComponent,
  RouterOutlet,
  HomeToggleComponent,
  CursoreComponent,
  MenuImpostazioniComponent,
  MenuProfiliComponent,
  AsyncPipe,
  CustomNavBarComponent,
  UserActiveComponent,
  NotificheComponent,
  CardCustomComponent,
];
