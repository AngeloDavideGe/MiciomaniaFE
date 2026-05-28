import { AsyncPipe } from '@angular/common';
import { Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconeListaComponent } from '../../../shared/components/custom/icone-lista.component';
import { FiltriMangaComponent } from '../components/ui/filtri-manga.component';
import { CardMangaComponent } from '../shared/card-manga.component';
import { SpinnerComponent } from '../../../../library/components/spinner/spinner.component';
import { CustomNavBarComponent } from '../../../../library/components/navbar/navbar.component';
import { TabsComponent } from '../../../../library/components/tabs/tabs.component';

export const manga_imports: Type<any>[] = [
  RouterOutlet,
  AsyncPipe,
  CardMangaComponent,
  TabsComponent,
  FiltriMangaComponent,
  IconeListaComponent,
  SpinnerComponent,
  CustomNavBarComponent,
];
