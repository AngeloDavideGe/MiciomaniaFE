import { Type } from '@angular/core';
import { CreaPropostaComponent } from '../components/crea-proposta/crea-proposta.component';
import { GrigliaElementiComponent } from '../components/griglia-elementi/griglia-elementi.component';
import { HeaderElementiComponent } from '../components/header-elementi.component';

export const elementi_utente_imports: Type<any>[] = [
  CreaPropostaComponent,
  HeaderElementiComponent,
  GrigliaElementiComponent,
];
