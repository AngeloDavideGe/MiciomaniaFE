import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ErrorHttpComponent } from '../../../shared/components/errorhttp.component';
import { CardMangaComponent } from '../shared/card-manga.component';
import { TabsMangaComponent } from '../shared/tabs-manga.component';

export const manga_imports = [
  NgIf,
  NgFor,
  RouterOutlet,
  AsyncPipe,
  FormsModule,
  CardMangaComponent,
  ErrorHttpComponent,
  TabsMangaComponent,
];
