import { AsyncPipe, NgSwitch, NgSwitchCase } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CardHomeComponent } from '../components/ui/card-home.component';
import { CercaProfiliComponent } from '../components/ui/cerca-profili/cerca-profili.component';
import { CursoreComponent } from '../components/ui/cursore.component';
import { MenuImpostazioniComponent } from '../components/ui/menu-impostazioni.component';
import { MenuProfiliComponent } from '../components/ui/menu-profili.component';
import { NavBarComponent } from '../components/ui/navbar.component';
import { SocialLinkComponent } from '../components/ui/social-link.component';

export const home_imports = [
  CardHomeComponent,
  SocialLinkComponent,
  CercaProfiliComponent,
  NgSwitch,
  NgSwitchCase,
  RouterOutlet,
  NavBarComponent,
  CursoreComponent,
  MenuImpostazioniComponent,
  MenuProfiliComponent,
  AsyncPipe,
];
