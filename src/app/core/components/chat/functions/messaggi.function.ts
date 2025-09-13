import { DropDownMessaggi } from '../interfaces/chat-group.interface';

export function getDropDown(params: {
  cond: boolean;
  rispondiFunc: Function;
}): DropDownMessaggi[] {
  const dropdown: DropDownMessaggi[] = [
    {
      titolo: 'Rispondi',
      click: () => params.rispondiFunc(),
      cond: true,
    },
    {
      titolo: 'Elimina',
      click: () => console.log('ELimina'),
      cond: params.cond,
    },
  ];

  return dropdown.filter((x: DropDownMessaggi) => x.cond);
}
