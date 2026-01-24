export function chartOptionsMappa(colors: string[]): any {
  return {
    title: 'Territori Conquistati',
    pieHole: 0.3,
    colors: colors,

    legend: {
      position: 'right',
      alignment: 'center',
      textStyle: {
        fontSize: 14,
        color: '#333',
      },
    },

    titleTextStyle: {
      fontSize: 22,
      bold: true,
      color: '#212529',
    },

    chartArea: {
      width: '90%',
      height: '80%',
      top: 70,
      left: 10,
    },

    pieSliceText: 'percentage',
    pieSliceTextStyle: {
      fontSize: 13,
      color: '#fff',
    },

    tooltip: {
      textStyle: {
        fontSize: 13,
      },
    },

    backgroundColor: 'transparent',
  };
}
