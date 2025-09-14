import { DropDownMessaggi } from '../interfaces/chat-group.interface';

export function getDropDown(params: {
  cond: boolean;
  rispondiFunc: Function;
  eliminaFunc: Function;
}): DropDownMessaggi[] {
  const dropdown: DropDownMessaggi[] = [
    {
      titolo: 'Rispondi',
      click: () => params.rispondiFunc(),
      cond: true,
    },
    {
      titolo: 'Elimina',
      click: () => params.eliminaFunc(),
      cond: params.cond,
    },
  ];

  return dropdown.filter((x: DropDownMessaggi) => x.cond);
}
