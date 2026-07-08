import { Type } from '@angular/core';
import { CardMangaComponent } from '../../../shared/card-manga.component';
import { InputTuoiMangaComponent } from './components/input-tuoi-manga.component';
import { SelectTabMangaComponent } from './components/select-tab-manga.component';
import { SpinnerIndyComponent } from '../../../../../../library/components/spinner/spinner-indy.component';
import { CustomNavBarComponent } from '../../../../../shared/components/navbar/navbar.component';
import { TabsIndyComponent } from '../../../../../../library/components/tabs/tabs-indy.component';

export const tuoi_manga_imports: Type<any>[] = [
  CardMangaComponent,
  TabsIndyComponent,
  InputTuoiMangaComponent,
  SelectTabMangaComponent,
  SpinnerIndyComponent,
  CustomNavBarComponent,
];
