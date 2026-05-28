import { AsyncPipe } from '@angular/common';
import { Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconeListaComponent } from '../../../shared/components/custom/icone-lista.component';
import { FiltriMangaComponent } from '../components/ui/filtri-manga.component';
import { TabsMangaComponent } from '../components/ui/tabs-manga.component';
import { CardMangaComponent } from '../shared/card-manga.component';
import { SpinnerComponent } from '../../../../library/components/spinner/spinner.component';
import { CustomNavBarComponent } from '../../../../library/components/navbar/navbar.component';

export const manga_imports: Type<any>[] = [
  RouterOutlet,
  AsyncPipe,
  CardMangaComponent,
  TabsMangaComponent,
  FiltriMangaComponent,
  IconeListaComponent,
  SpinnerComponent,
  CustomNavBarComponent,
];
