import { Type } from '@angular/core';
import { ErrorHttpComponent } from '../../../../../../shared/components/custom/errorhttp.component';
import { CardMangaComponent } from '../../../../shared/card-manga.component';
import { DettagliMangaComponent } from '../../../../shared/dettagli-manga.component';
import { InputTuoiMangaComponent } from '../components/input-tuoi-manga.component';
import { SelectTabMangaComponent } from '../components/select-tab-manga.component';
import { TabsTuoiMangaComponent } from '../components/tabs-tuoi-manga.component';

export const tuoi_manga_imports: Type<any>[] = [
  CardMangaComponent,
  ErrorHttpComponent,
  DettagliMangaComponent,
  TabsTuoiMangaComponent,
  InputTuoiMangaComponent,
  SelectTabMangaComponent,
];
