import { Type } from '@angular/core';
import { ContaierMicioComponent } from '../../../../shared/components/container-micio.component';
import { DescrizioneMicioComponent } from '../../../../shared/components/descrizione-micio.component';
import { MangaToolbarComponent } from './components/manga-toolbar/manga-toolbar.component';
import { SidebarIndyComponent } from '../../../../../library/components/sidebar/sidebar-indy.component';
import { TabsIndyComponent } from '../../../../../library/components/tabs/tabs-indy.component';
import { CardIndyComponent } from '../../../../../library/components/card/card-indy.component';
import { SpinnerIndyComponent } from '../../../../../library/components/spinner/spinner-indy.component';

export const manga_imports: Type<any>[] = [
  ContaierMicioComponent,
  DescrizioneMicioComponent,
  MangaToolbarComponent,
  SidebarIndyComponent,
  TabsIndyComponent,
  CardIndyComponent,
  SpinnerIndyComponent,
];
