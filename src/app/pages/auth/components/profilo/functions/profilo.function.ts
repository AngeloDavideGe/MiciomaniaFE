import { iTab } from '../../../../../../library/interfaces/navbar.interface';
import { ILang } from '../../../../../core/interfaces/lang.interface';

export function getProfiloTabs(lang: ILang['Profilo']['Tabs']): iTab[] {
  return [
    {
      id: 'text',
      label: lang.PostTesto,
      color: 'var(--primary-light)',
      icona: 'bi bi-chat-left-text',
    },
    {
      id: 'photo',
      label: lang.PostFoto,
      color: 'var(--primary-light)',
      icona: 'bi bi-images',
    },
  ];
}
