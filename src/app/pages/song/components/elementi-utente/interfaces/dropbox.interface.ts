import { Proposta } from '../../../../../shared/interfaces/elementiUtente.interface';

export interface DropboxResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface ProposaPrePost {
  proposta: Proposta;
  file: File;
  basePath: string;
}
