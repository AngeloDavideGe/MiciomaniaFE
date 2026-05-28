import { Type } from '@angular/core';
import { CardMangaComponent } from '../../../../shared/card-manga.component';
import { InputTuoiMangaComponent } from '../components/input-tuoi-manga.component';
import { SelectTabMangaComponent } from '../components/select-tab-manga.component';
import { SpinnerComponent } from '../../../../../../../library/components/spinner/spinner.component';
import { CustomNavBarComponent } from '../../../../../../../library/components/navbar/navbar.component';
import { TabsComponent } from '../../../../../../../library/components/tabs/tabs.component';

export const tuoi_manga_imports: Type<any>[] = [
  CardMangaComponent,
  TabsComponent,
  InputTuoiMangaComponent,
  SelectTabMangaComponent,
  SpinnerComponent,
  CustomNavBarComponent,
];
