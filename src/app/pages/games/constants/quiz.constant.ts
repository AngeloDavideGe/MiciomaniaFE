import { Quiz } from '../interfaces/games.interfaces';

const quiz: Quiz[] = [
  {
    domanda: 'Perché Indy deride i sentimenti?',
    risposte: [
      { testo: 'Perché ha il cuore nero come la pece', soluzione: false },
      {
        testo: 'Perché i sentimenti sono una debolezza e lui è un dio',
        soluzione: false,
      },
      {
        testo: 'Perché è emotivamente castrato come un gatto randagio',
        soluzione: true,
      },
    ],
  },
  {
    domanda: 'Come umilia Indy chi gli vuole bene?',
    risposte: [
      {
        testo: 'Dando loro soprannomi che neanche un bullo delle medie',
        soluzione: true,
      },
      {
        testo: 'Regalando fiori e poi bruciandoli davanti a loro',
        soluzione: false,
      },
      {
        testo:
          "Scrivendo poesie d'amore per poi strapparle davanti ai loro occhi",
        soluzione: false,
      },
    ],
  },
  {
    domanda: 'Perché Fulvio è un mostro?',
    risposte: [
      {
        testo: 'Perché ha mangiato un cucciolo di panda a colazione',
        soluzione: false,
      },
      {
        testo: 'Perché nel suo DNA c’è più odio che globuli rossi',
        soluzione: true,
      },
      {
        testo: 'Perché spaventa i bambini nei parchi giochi',
        soluzione: false,
      },
    ],
  },
  {
    domanda: 'Qual è la missione di Punty fotografo?',
    risposte: [
      {
        testo: 'Scattare la foto perfetta per poi dimenticarsi di salvarla',
        soluzione: true,
      },
      {
        testo: 'Raccogliere materiale compromettente per ricattare Indy',
        soluzione: false,
      },
      {
        testo:
          'Usare la fotografia per dimostrare che Francesca piange in ogni situazione',
        soluzione: false,
      },
    ],
  },
  {
    domanda: 'Cosa fa ColonVVX su YouTube?',
    risposte: [
      {
        testo: 'Video Pokémon con qualità video pari a un Nokia del 2005',
        soluzione: true,
      },
      {
        testo: 'Tutorial su come umiliare gli amici senza farsi odiare',
        soluzione: false,
      },
      { testo: 'Recensioni di pentole ma con voce da ASMR', soluzione: false },
    ],
  },
  {
    domanda: 'Perché Pedro spende soldi per Miku?',
    risposte: [
      {
        testo: 'Perché spera segretamente che diventi reale e lo sposi',
        soluzione: true,
      },
      {
        testo: 'Perché è stato maledetto da un demone otaku',
        soluzione: false,
      },
      {
        testo: 'Perché è un investitore visionario e crede in MikuCoin',
        soluzione: false,
      },
    ],
  },
  {
    domanda: 'Cosa fa Francesca quando qualcosa non va?',
    risposte: [
      {
        testo: 'Piange come se avesse visto la fine di un anime strappalacrime',
        soluzione: true,
      },
      { testo: 'Compone poesie sulla sofferenza umana', soluzione: false },
      { testo: 'Si arrampica su un albero e non scende più', soluzione: false },
    ],
  },
  {
    domanda: 'Perché Claudia insiste con il midollo osseo?',
    risposte: [
      {
        testo: 'Perché vuole inseminare il mondo con il suo potere genetico',
        soluzione: true,
      },
      {
        testo: 'Perché ha scambiato biologia con fantascienza',
        soluzione: false,
      },
      {
        testo: 'Perché sta segretamente creando una nuova razza suprema',
        soluzione: false,
      },
    ],
  },
  {
    domanda: 'Qual è il vero problema di Claudia con gli uomini?',
    risposte: [
      {
        testo: 'Ha visto troppi film horror dove loro sono i cattivi',
        soluzione: false,
      },
      {
        testo: 'Ha deciso che il genere maschile è un bug evolutivo',
        soluzione: true,
      },
      {
        testo: 'Ha perso una scommessa e ora deve odiarli per contratto',
        soluzione: false,
      },
    ],
  },
  {
    domanda: 'Perché Giovanna odia Indy?',
    risposte: [
      { testo: 'Perché è offensivo come un meme del 2012', soluzione: true },
      {
        testo:
          'Perché gli ha rubato il pranzo una volta e non l’ha mai dimenticato',
        soluzione: false,
      },
      {
        testo: 'Perché ha dichiarato guerra ai suoi gusti musicali',
        soluzione: false,
      },
    ],
  },
];

export default quiz;
