import { DropDownMessaggi, Messaggio } from '../interfaces/chat.interface';

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

export function getMessaggioBenvenuto(): Messaggio {
  const ieri = new Date();
  ieri.setDate(ieri.getDate() - 1);

  return {
    id: 0,
    chat_id: 0,
    sender: 'Admin',
    content: 'Benvenuto in questa nuova chat',
    created_at: ieri,
    response: null,
    separator: true,
  } as Messaggio;
}
