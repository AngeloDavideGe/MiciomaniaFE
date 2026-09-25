import {
  DatiSvg,
  PathSvgCustom,
  SvgBar,
  SvgCircle,
} from '../interfaces/svg.interface';

export function creaCirclePaths(
  dati: DatiSvg[],
  svgCircle?: SvgCircle,
): PathSvgCustom[] {
  const centro: number = svgCircle?.centro || 150;
  const raggio: number = svgCircle?.raggio || 120;
  const raggioBuco: number = svgCircle?.raggioBuco || 0;
  const simmetrico: boolean = svgCircle?.simmetrico || false;
  const raggioInterno: number = Math.min(raggioBuco, raggio);
  const totale: number = dati.reduce(
    (somma: number, elemento: DatiSvg) => somma + elemento.valore,
    0,
  );
  const media: number = totale / dati.length;
  let angoloCorrente: number = -Math.PI / 2;

  return dati.map((data: DatiSvg) => {
    const valore: number = simmetrico ? media : data.valore;
    const ampiezza: number = (valore / totale) * 2 * Math.PI;
    const angoloFinale: number = angoloCorrente + ampiezza;
    const angoloMedio: number = angoloCorrente + ampiezza / 2;
    const raggioTesto: number = raggioInterno + (raggio - raggioInterno) / 2;

    const d: string = [
      `M ${centro + raggio * Math.cos(angoloCorrente)} ${centro + raggio * Math.sin(angoloCorrente)}`,
      `A ${raggio} ${raggio} 0 ${ampiezza > Math.PI ? 1 : 0} 1 ${centro + raggio * Math.cos(angoloFinale)} ${centro + raggio * Math.sin(angoloFinale)}`,
      raggioInterno > 0
        ? `L ${centro + raggioInterno * Math.cos(angoloFinale)} ${centro + raggioInterno * Math.sin(angoloFinale)} A ${raggioInterno} ${raggioInterno} 0 ${ampiezza > Math.PI ? 1 : 0} 0 ${centro + raggioInterno * Math.cos(angoloCorrente)} ${centro + raggioInterno * Math.sin(angoloCorrente)}`
        : `L ${centro} ${centro}`,
      'Z',
    ].join(' ');

    angoloCorrente = angoloFinale;

    return {
      title: data.titolo,
      d: d,
      fill: data.colore || 'var(--primary-light)',
      textX: centro + raggioTesto * Math.cos(angoloMedio),
      textY: centro + raggioTesto * Math.sin(angoloMedio),
      click: () => data.click?.(),
    };
  });
}

export function creaBarPaths(
  dati: DatiSvg[],
  svgBar?: SvgBar,
): PathSvgCustom[] {
  const larghezzaMassima: number = svgBar?.larghezzaMassima || 280;
  const altezzaBarra: number = svgBar?.altezzaBarra || 32;
  const spazio: number = svgBar?.spazio || 12;
  const margine: number = svgBar?.margine || 10;
  const massimo: number = Math.max(0, ...dati.map((dato) => dato.valore));

  return dati.map((dato, indice) => {
    const y: number = margine + indice * (altezzaBarra + spazio);
    const larghezzaValore: number =
      massimo > 0 ? (dato.valore / massimo) * larghezzaMassima : 0;
    const larghezzaTesto: number = Math.min(
      larghezzaMassima,
      dato.titolo.length * 9 + 28,
    );
    const larghezza: number = Math.max(larghezzaValore, larghezzaTesto);

    const d: string = [
      `M ${margine} ${y}`,
      `H ${margine + larghezza}`,
      `V ${y + altezzaBarra}`,
      `H ${margine}`,
      'Z',
    ].join(' ');

    return {
      title: dato.titolo,
      d: d,
      fill: dato.colore || 'var(--primary-light)',
      textX: margine + larghezza / 2,
      textY: y + altezzaBarra / 2,
      click: () => dato.click?.(),
    };
  });
}
