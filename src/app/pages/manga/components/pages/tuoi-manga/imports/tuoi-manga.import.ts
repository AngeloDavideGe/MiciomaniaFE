import { Type } from '@angular/core';
import { ErrorHttpComponent } from '../../../../../../shared/components/custom/errorhttp.component';
import { CardMangaComponent } from '../../../../shared/card-manga.component';
import { InputTuoiMangaComponent } from '../components/input-tuoi-manga.component';
import { SelectTabMangaComponent } from '../components/select-tab-manga.component';
import { TabsTuoiMangaComponent } from '../components/tabs-tuoi-manga.component';
import { SpinnerComponent } from '../../../../../../shared/components/dialogs/spinner.component';
import { CustomNavBarComponent } from '../../../../../../shared/components/custom/navbar-custom.component';

export const tuoi_manga_imports: Type<any>[] = [
  CardMangaComponent,
  ErrorHttpComponent,
  TabsTuoiMangaComponent,
  InputTuoiMangaComponent,
  SelectTabMangaComponent,
  SpinnerComponent,
  CustomNavBarComponent,
];
