import { iCard } from '../../../../library/interfaces/card.interface';
import { RaggioPage } from '../../../../library/interfaces/pagination.interface';

export const gamesConstant: iCard[] = [
  {
    titolo: 'Tris',
    descrizione:
      'Il classico gioco del Tris, ma con un tocco di umiliazione! Metti alla prova la tua strategia e preparati a essere deriso da Indy Kun quando perdi. "Hai perso contro un gioco per bambini? Davvero?"',
    urlPic:
      'https://media.istockphoto.com/id/937025192/it/vettoriale/gioco-tic-tac-toe.jpg?s=612x612&w=0&k=20&c=0QMRQ6Bkx5pIh_unt9LvMbhJnygMCbZx2LEsc-VFxC4=',
    routerLink: '/games/tris',
    bottone: 'Gioca',
  },
  {
    titolo: 'Forza 4',
    descrizione:
      'Un gioco dove il potere dell amicizia non è l unica forza, ma anche il 4, potere derivato dai Fantastici 4 (membri di miciomania che hanno fatto piangere le ragazze"',
    urlPic:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhh-gfjB_rEBF7BrJDEMU70EpzaesANIZleStpM9I9wY0Xd9d7rJjkdsiLztqFpn9MjSRmtVkfs7Sf_gxyMTAmXD2xhNnbUU4Fe9OWRjKtptFvh5SwltomvNaUzr3TS4sQPJA3wbgN641H9/s1600/forza-4-online.jpeg',
    routerLink: '/games/forza-4',
    bottone: 'Gioca',
  },
  {
    titolo: 'Battaglia Navale',
    descrizione:
      'Preparati a navigare in acque pericolose e a essere umiliato! Affonda le navi nemiche, ma attento: se perdi, Indy Kun ti ricorderà che "persino un pirata ubriaco giocherebbe meglio di te". Siluri di insulti inclusi!',
    urlPic:
      'https://upload.wikimedia.org/wikipedia/commons/6/65/Battleship_game_board.svg',
    routerLink: '/games/battaglia-navale',
    bottone: 'Gioca',
  },
  {
    titolo: 'Quiz Pazzesco',
    descrizione:
      'Metti alla prova la tua conoscenza e preparati a essere deriso! Domande così difficili che ti faranno dubitare della tua intelligenza. E se fallisci, Indy Kun sarà lì a dirti: "Ma come hai fatto a non saperlo? È roba da asilo!"',
    urlPic:
      'https://img.freepik.com/vettori-premium/quiz-in-stile-fumetto-pop-art-quiz-parola-gioco-intelligente-disegno-di-illustrazione-vettoriale_180786-81.jpg',
    routerLink: '/games/quiz',
    bottone: 'Gioca',
  },
  {
    titolo: 'Memory',
    descrizione:
      'Devi indovinare le coppie presenti tra le carte coperte, quando le trovi verranno tolte da terra, altrimenti saranno rigirate',
    urlPic:
      'https://store-images.s-microsoft.com/image/apps.5303.13834962130662620.16bc9f00-a732-4534-843d-1f42a6785ffe.96587c35-351e-4b22-9cd8-f63fd13cf63f?h=1280',
    routerLink: '/games/memory',
    bottone: 'Gioca',
  },
  {
    titolo: 'Sudoku',
    descrizione:
      'Inserisci i numeri da 1 a 9 in ogni riga, colonna e regione 3x3 senza ripetizioni. Ma attento, se sbagli, Indy Kun ti dirà: "Forse il Sudoku non è il tuo forte, vero?"',
    urlPic:
      'https://th.bing.com/th/id/R.bcd32f680832e366bbd152eaa0e6bddd?rik=EhKn0ubH2LygUw&riu=http%3a%2f%2figm.univ-mlv.fr%2f%7edr%2fXPOSE2013%2fsudoku%2fimg%2fsudoku1.jpeg&ehk=d53WwForN1gZLuEbFMh1HYmbXClMiIQYpAeNytmmBdM%3d&risl=&pid=ImgRaw&r=0',
    routerLink: '/games/sudoku',
    bottone: 'Gioca',
  },
  {
    titolo: 'Ruota della Fortuna',
    descrizione:
      'Gira la ruota e vedi cosa ti riserva il destino! Inserisci i numeri da 1 a 9 in ogni riga, colonna e regione 3x3 senza ripetizioni. Ma attento, se sbagli, Indy Kun ti dirà: "Forse il Sudoku non è il tuo forte, vero?"',
    urlPic:
      'https://th.bing.com/th/id/R.bcd32f680832e366bbd152eaa0e6bddd?rik=EhKn0ubH2LygUw&riu=http%3a%2f%2figm.univ-mlv.fr%2f%7edr%2fXPOSE2013%2fsudoku%2fimg%2fsudoku1.jpeg&ehk=d53WwForN1gZLuEbFMh1HYmbXClMiIQYpAeNytmmBdM%3d&risl=&pid=ImgRaw&r=0',
    routerLink: '/games/ruota-della-fortuna',
    bottone: 'Gioca',
  },
];

export const pagineGames: RaggioPage[] = [
  {
    width: 1400,
    raggio: 4,
  },
  {
    width: 1100,
    raggio: 3,
  },
  {
    width: 700,
    raggio: 2,
  },
  {
    width: 0,
    raggio: 1,
  },
];
