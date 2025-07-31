import { PosizionaNave } from '../../../../interfaces/games.interfaces';

export function controlloCasuale(pn: PosizionaNave): boolean {
  let casuale: number;

  if (pn.nave.tipoNave == 'navePiccola') {
    casuale = Math.floor(Math.random() * 2);
  } else {
    casuale = Math.floor(Math.random() * 3);
  }

  switch (casuale) {
    case 1:
      return controlloVerticale(pn);
    case 2:
      return controlloIncrociato(pn);
    default:
      return controlloOrizzontale(pn);
  }
}

function controlloOrizzontale(pn: PosizionaNave): boolean {
  if (pn.colonna + pn.nave.lunghezzaNave > pn.dimGriglia) return false;

  const pn1: PosizionaNave = structuredClone(pn);

  for (let i = 0; i < pn.nave.lunghezzaNave; i++) {
    if (cellaOccupata(pn1)) {
      return false;
    }
    pn1.colonna++;
  }

  for (let i = 0; i < pn.nave.lunghezzaNave; i++) {
    pn.celle[pn.nave.keyCell][pn.riga][pn.colonna + i][pn.nave.tipoNave] = true;
  }

  return true;
}

function controlloVerticale(pn: PosizionaNave): boolean {
  if (pn.riga + pn.nave.lunghezzaNave > pn.dimGriglia) return false;

  const pn1: PosizionaNave = structuredClone(pn);

  for (let i = 0; i < pn.nave.lunghezzaNave; i++) {
    if (cellaOccupata(pn1)) {
      return false;
    }
    pn1.riga++;
  }

  for (let i = 0; i < pn.nave.lunghezzaNave; i++) {
    pn.celle[pn.nave.keyCell][pn.riga + i][pn.colonna][pn.nave.tipoNave] = true;
  }

  return true;
}

function controlloIncrociato(pn: PosizionaNave): boolean {
  if (pn.riga - 1 < 0 || pn.colonna + 1 >= pn.dimGriglia) {
    return false;
  }
  const pn1: PosizionaNave = structuredClone(pn);
  const pn2: PosizionaNave = structuredClone(pn);

  pn1.riga--;
  pn2.colonna++;

  if (cellaOccupata(pn) || cellaOccupata(pn1) || cellaOccupata(pn2)) {
    return false;
  }

  pn.celle[pn.nave.keyCell][pn.riga][pn.colonna][pn.nave.tipoNave] = true;
  pn.celle[pn.nave.keyCell][pn.riga - 1][pn.colonna][pn.nave.tipoNave] = true;
  pn.celle[pn.nave.keyCell][pn.riga][pn.colonna + 1][pn.nave.tipoNave] = true;

  return true;
}

export function cellaOccupata(pn: PosizionaNave): boolean {
  return (
    pn.celle[pn.nave.keyCell][pn.riga][pn.colonna].navePiccola ||
    pn.celle[pn.nave.keyCell][pn.riga][pn.colonna].naveGrande
  );
}
