import { Type } from '@angular/core';
import { CardMangaComponent } from '../../../../shared/card-manga.component';
import { InputTuoiMangaComponent } from '../components/input-tuoi-manga.component';
import { SelectTabMangaComponent } from '../components/select-tab-manga.component';
import { TabsTuoiMangaComponent } from '../components/tabs-tuoi-manga.component';
import { SpinnerComponent } from '../../../../../../../library/components/spinner/spinner.component';
import { CustomNavBarComponent } from '../../../../../../../library/components/navbar/navbar.component';

export const tuoi_manga_imports: Type<any>[] = [
  CardMangaComponent,
  TabsTuoiMangaComponent,
  InputTuoiMangaComponent,
  SelectTabMangaComponent,
  SpinnerComponent,
  CustomNavBarComponent,
];
