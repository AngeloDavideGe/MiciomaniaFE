import { iTab } from '../../../../../../library/interfaces/tabs.interface';

export function getProfiloTabs(): iTab[] {
  return [
    {
      id: 'text',
      label: 'Post di testo',
      color: 'var(--primary-light)',
      icona: 'bi bi-chat-left-text',
    },
    {
      id: 'photo',
      label: 'Post con foto',
      color: 'var(--primary-light)',
      icona: 'bi bi-images',
    },
  ];
}
