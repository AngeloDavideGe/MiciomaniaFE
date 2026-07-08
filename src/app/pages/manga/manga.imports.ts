import { AsyncPipe } from '@angular/common';
import { Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FiltriMangaComponent } from './components/ui/filtri-manga.component';
import { CardMangaComponent } from './shared/card-manga.component';
import { SpinnerIndyComponent } from '../../../library/components/spinner/spinner-indy.component';
import { CustomNavBarComponent } from '../../shared/components/navbar/navbar.component';
import { TabsIndyComponent } from '../../../library/components/tabs/tabs-indy.component';

export const manga_imports: Type<any>[] = [
  RouterOutlet,
  AsyncPipe,
  CardMangaComponent,
  TabsIndyComponent,
  FiltriMangaComponent,
  SpinnerIndyComponent,
  CustomNavBarComponent,
  TabsIndyComponent,
];
