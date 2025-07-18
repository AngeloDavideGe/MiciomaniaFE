import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ErrorHttpComponent } from '../../../shared/components/errorhttp.component';
import { TabsMangaComponent } from '../components/ui/tabs-manga.component';
import { CardMangaComponent } from '../shared/card-manga.component';
import { DettagliMangaComponent } from '../shared/dettagli-manga.component';
import { FiltriMangaComponent } from '../components/ui/filtri-manga.component';

export const manga_imports = [
  RouterOutlet,
  AsyncPipe,
  CardMangaComponent,
  ErrorHttpComponent,
  TabsMangaComponent,
  DettagliMangaComponent,
  FiltriMangaComponent,
];
