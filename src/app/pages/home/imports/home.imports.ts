import { AsyncPipe } from '@angular/common';
import { Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CursoreComponent } from '../components/ui/cursore.component';
import { MenuImpostazioniComponent } from '../components/ui/menu-impostazioni.component';
import { MenuProfiliComponent } from '../components/ui/menu-profili.component';
import { HomeToggleComponent } from '../components/ui/home-toggle.component';
import { SocialLinkComponent } from '../components/ui/social-link.component';
import { CarouselHomeComponent } from '../components/ui/carousel-home.component';
import { CustomNavBarComponent } from '../../../shared/components/custom/navbar-custom.component';

export const home_imports: Type<any>[] = [
  CarouselHomeComponent,
  SocialLinkComponent,
  RouterOutlet,
  HomeToggleComponent,
  CursoreComponent,
  MenuImpostazioniComponent,
  MenuProfiliComponent,
  AsyncPipe,
  CustomNavBarComponent,
];
