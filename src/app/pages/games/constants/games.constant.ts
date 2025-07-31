import { CardGioco } from '../interfaces/games.interfaces';

export const gamesConstant: CardGioco[] = [
  {
    nome: 'Tris',
    descrizione:
      'Il classico gioco del Tris, ma con un tocco di umiliazione! Metti alla prova la tua strategia e preparati a essere deriso da Indy Kun quando perdi. "Hai perso contro un gioco per bambini? Davvero?"',
    linkImg:
      'https://media.istockphoto.com/id/937025192/it/vettoriale/gioco-tic-tac-toe.jpg?s=612x612&w=0&k=20&c=0QMRQ6Bkx5pIh_unt9LvMbhJnygMCbZx2LEsc-VFxC4=',
    routerLink: 'tris',
  },
  {
    nome: 'Forza 4',
    descrizione:
      'Un gioco dove il potere dell amicizia non è l unica forza, ma anche il 4, potere derivato dai Fantastici 4 (membri di miciomania che hanno fatto piangere le ragazze"',
    linkImg:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhh-gfjB_rEBF7BrJDEMU70EpzaesANIZleStpM9I9wY0Xd9d7rJjkdsiLztqFpn9MjSRmtVkfs7Sf_gxyMTAmXD2xhNnbUU4Fe9OWRjKtptFvh5SwltomvNaUzr3TS4sQPJA3wbgN641H9/s1600/forza-4-online.jpeg',
    routerLink: 'forza-4',
  },
  {
    nome: 'Battaglia Navale',
    descrizione:
      'Preparati a navigare in acque pericolose e a essere umiliato! Affonda le navi nemiche, ma attento: se perdi, Indy Kun ti ricorderà che "persino un pirata ubriaco giocherebbe meglio di te". Siluri di insulti inclusi!',
    linkImg:
      'https://upload.wikimedia.org/wikipedia/commons/6/65/Battleship_game_board.svg',
    routerLink: 'battaglia-navale',
  },
  {
    nome: 'Quiz Pazzesco',
    descrizione:
      'Metti alla prova la tua conoscenza e preparati a essere deriso! Domande così difficili che ti faranno dubitare della tua intelligenza. E se fallisci, Indy Kun sarà lì a dirti: "Ma come hai fatto a non saperlo? È roba da asilo!"',
    linkImg:
      'https://img.freepik.com/vettori-premium/quiz-in-stile-fumetto-pop-art-quiz-parola-gioco-intelligente-disegno-di-illustrazione-vettoriale_180786-81.jpg',
    routerLink: 'quiz',
  },
  {
    nome: 'Trova la Sequenza',
    descrizione:
      'Prova ad indovinare la sequenza corretta di numeri in questa tabella, hai un tot di tentativi prima di essere umiliato dagli esagerati degli altri team, pronti a impadronirsi della tua mente e farti piangere',
    linkImg:
      'https://roma.cityrumors.it/wp-content/uploads/2023/11/sequenza-roma.cityrumors.it-291123.jpg',
    routerLink: 'trova-sequenza',
  },
  {
    nome: 'Memory',
    descrizione:
      'Devi indovinare le coppie presenti tra le carte coperte, quando le trovi verranno tolte da terra, altrimenti saranno rigirate',
    linkImg:
      'https://store-images.s-microsoft.com/image/apps.5303.13834962130662620.16bc9f00-a732-4534-843d-1f42a6785ffe.96587c35-351e-4b22-9cd8-f63fd13cf63f?h=1280',
    routerLink: 'memory',
  },
];
