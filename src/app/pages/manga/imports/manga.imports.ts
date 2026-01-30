import { AsyncPipe } from '@angular/common';
import { Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorHttpComponent } from '../../../shared/components/custom/errorhttp.component';
import { IconeListaComponent } from '../../../shared/components/custom/icone-lista.component';
import { FiltriMangaComponent } from '../components/ui/filtri-manga.component';
import { TabsMangaComponent } from '../components/ui/tabs-manga.component';
import { CardMangaComponent } from '../shared/card-manga.component';
import { HeaderCustomComponent } from '../../../shared/components/custom/header-custom.component';
import { SpinnerComponent } from '../../../shared/components/dialogs/spinner.component';

export const manga_imports: Type<any>[] = [
  RouterOutlet,
  AsyncPipe,
  CardMangaComponent,
  ErrorHttpComponent,
  TabsMangaComponent,
  FiltriMangaComponent,
  IconeListaComponent,
  HeaderCustomComponent,
  SpinnerComponent,
];
