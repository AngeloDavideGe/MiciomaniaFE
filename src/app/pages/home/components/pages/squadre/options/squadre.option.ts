export function chartOptionsSquadre(colors: string[]): any {
  return {
    title: 'Punteggi Squadre',
    pieHole: 0.4,
    colors: colors,
    legend: {
      position: 'bottom',
      textStyle: {
        fontSize: 18,
      },
    },
    titleTextStyle: {
      fontSize: 28,
      bold: true,
    },
    chartArea: {
      width: '70%',
      top: 60,
    },
  };
}
