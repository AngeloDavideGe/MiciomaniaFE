export function chartOptionsUtenti(): any {
  return {
    title: 'Punteggi Utenti',
    titleTextStyle: {
      fontSize: 28,
      bold: true,
    },
    chartArea: {
      width: '70%',
      top: 60,
    },
    hAxis: {
      titleTextStyle: {
        fontSize: 24,
        bold: true,
      },
      textStyle: {
        fontSize: 20,
      },
      minValue: 0,
      format: '0',
      gridlines: { count: 5 },
    },
    vAxis: {
      titleTextStyle: {
        fontSize: 24,
        bold: true,
      },
      textStyle: {
        fontSize: 20,
      },
    },
    legend: {
      position: 'bottom',
      textStyle: {
        fontSize: 18,
      },
    },
  };
}
