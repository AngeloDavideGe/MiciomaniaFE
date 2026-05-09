import { environment } from '../../../../../environments/environment';
import { DataHttp } from '../../../api/http.data';
import {
  DropDownMessaggi,
  GruppiChat,
  Gruppo,
  IMessaggioComponent,
  Messaggio,
  MessaggioUpdate,
} from '../interfaces/chat.interface';

export function getDropDown(params: {
  cond: boolean;
  rispondiFunc: Function;
  modificaFunc: Function;
  eliminaFunc: Function;
}): DropDownMessaggi[] {
  const dropdown: DropDownMessaggi[] = [
    {
      titolo: 'Rispondi',
      click: () => params.rispondiFunc(),
      cond: true,
    },
    {
      titolo: 'Modifica',
      click: () => params.modificaFunc(),
      cond: params.cond,
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

export function getMessaggioCompBenvenuto(
  message: Messaggio,
): IMessaggioComponent {
  return {
    message: message,
    name: message.sender,
    replySender: '',
    replyText: '',
    urlPic: environment.defaultPicsUrl.user,
    class2: 'received',
  };
}

export function addNewMessage(gruppi: GruppiChat): void {
  const messaggi: Record<number, Messaggio[]> =
    DataHttp.gruppiChat.messaggi || {};
  const cambiati: Record<number, MessaggioUpdate[]> =
    gruppi.messaggiCambiati || {};
  const cambiatiMap: Record<number, Map<number, MessaggioUpdate>> = {};

  Object.keys(cambiati).forEach((chatId) => {
    const idNum = Number(chatId);
    cambiatiMap[idNum] = new Map();

    cambiati[idNum].forEach((update: MessaggioUpdate) => {
      cambiatiMap[idNum].set(update.id, update);
    });
  });

  gruppi.listaGruppi.forEach((x: Gruppo) => {
    const chatId: number = x.id;

    if (messaggi[chatId]) {
      if (cambiatiMap[chatId]) {
        const existingMessages: Messaggio[] = messaggi[chatId];

        for (let i = existingMessages.length - 1; i >= 0; i--) {
          const update: MessaggioUpdate | undefined = cambiatiMap[chatId].get(
            existingMessages[i].id,
          );

          if (update && update.contentNew != '') {
            existingMessages[i].content = update.contentNew;
            cambiatiMap[chatId].delete(existingMessages[i].id);
          }
        }
      }

      const newMessages: Messaggio[] = gruppi.messaggi[chatId] || [];
      const maxMessages: number = environment.maxElement.message;
      const allMessages: Messaggio[] = messaggi[chatId].concat(newMessages);

      if (allMessages.length > maxMessages) {
        messaggi[chatId] = allMessages.slice(-maxMessages);
      } else {
        messaggi[chatId] = allMessages;
      }
    } else {
      messaggi[chatId] = gruppi.messaggi[chatId] || [];
    }
  });

  DataHttp.gruppiChat = {
    listaGruppi: gruppi.listaGruppi,
    messaggi: messaggi,
    messaggiCambiati: cambiati,
    ultimoAggiornamento: new Date(),
    ultimoId: gruppi.ultimoId,
  };
}
