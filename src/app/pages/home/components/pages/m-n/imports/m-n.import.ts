import { NgClass } from '@angular/common';
import { Type } from '@angular/core';
import { CardLetteraComponent } from '../components/card-lettera.component';
import { HeaderMNComponent } from '../components/header-mn.component';
import { IconeListaComponent } from '../components/icone-lista.component';

export const mn_imports: Type<any>[] = [
  HeaderMNComponent,
  CardLetteraComponent,
  IconeListaComponent,
  NgClass,
];
