import { DropDownMessaggi } from '../interfaces/chat-group.interface';

export function getDropDown(cond: boolean): DropDownMessaggi[] {
  const dropdown: DropDownMessaggi[] = [
    {
      titolo: 'Rispondi',
      click: () => console.log('Rispondi'),
      cond: true,
    },
    {
      titolo: 'Elimina',
      click: () => console.log('ELimina'),
      cond: cond,
    },
  ];

  return dropdown.filter((x: DropDownMessaggi) => x.cond);
}
