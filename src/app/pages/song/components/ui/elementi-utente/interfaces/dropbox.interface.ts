import { Proposta } from '../../../../../../shared/interfaces/elementiUtente.interface';

export interface ProposaPrePost {
  proposta: Proposta;
  file: File;
  copertina: File;
  basePath: string;
}
