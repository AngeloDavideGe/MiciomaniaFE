import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ErrorHttpComponent } from '../../../shared/components/errorhttp.component';
import { CardMangaComponent } from '../shared/card-manga.component';
import { DettagliMangaComponent } from '../shared/dettagli-manga.component';
import { TabsMangaComponent } from '../components/ui/tabs-manga.component';

export const manga_imports = [
  RouterOutlet,
  AsyncPipe,
  FormsModule,
  CardMangaComponent,
  ErrorHttpComponent,
  TabsMangaComponent,
  DettagliMangaComponent,
];
