import { Regione } from '../../../interfaces/region.interface';

export const regioniMock: Regione[] = [
  {
    nome: 'Abruzzo',
    codice: 'ABR',
    province: [
      {
        nome: "L'Aquila",
        codice: '066',
        codReg: 'ABR',
      },
      {
        nome: 'Teramo',
        codice: '067',
        codReg: 'ABR',
      },
      {
        nome: 'Pescara',
        codice: '068',
        codReg: 'ABR',
      },
      {
        nome: 'Chieti',
        codice: '069',
        codReg: 'ABR',
      },
    ],
  },
  {
    nome: 'Basilicata',
    codice: 'BAS',
    province: [
      {
        nome: 'Potenza',
        codice: '076',
        codReg: 'BAS',
      },
      {
        nome: 'Matera',
        codice: '077',
        codReg: 'BAS',
      },
    ],
  },
  {
    nome: 'Calabria',
    codice: 'CAL',
    province: [
      {
        nome: 'Catanzaro',
        codice: '079',
        codReg: 'CAL',
      },
      {
        nome: 'Reggio Calabria',
        codice: '080',
        codReg: 'CAL',
      },
      {
        nome: 'Cosenza',
        codice: '081',
        codReg: 'CAL',
      },
      {
        nome: 'Crotone',
        codice: '082',
        codReg: 'CAL',
      },
      {
        nome: 'Vibo Valentia',
        codice: '083',
        codReg: 'CAL',
      },
    ],
  },
  {
    nome: 'Campania',
    codice: 'CAM',
    province: [
      {
        nome: 'Napoli',
        codice: '063',
        codReg: 'CAM',
      },
      {
        nome: 'Salerno',
        codice: '064',
        codReg: 'CAM',
      },
      {
        nome: 'Avellino',
        codice: '065',
        codReg: 'CAM',
      },
      {
        nome: 'Caserta',
        codice: '067',
        codReg: 'CAM',
      },
      {
        nome: 'Benevento',
        codice: '068',
        codReg: 'CAM',
      },
    ],
  },
  {
    nome: 'Emilia-Romagna',
    codice: 'EMR',
    province: [
      {
        nome: 'Bologna',
        codice: '037',
        codReg: 'EMR',
      },
      {
        nome: 'Modena',
        codice: '038',
        codReg: 'EMR',
      },
      {
        nome: 'Reggio Emilia',
        codice: '039',
        codReg: 'EMR',
      },
      {
        nome: 'Parma',
        codice: '040',
        codReg: 'EMR',
      },
      {
        nome: 'Ravenna',
        codice: '039',
        codReg: 'EMR',
      },
    ],
  },
  {
    nome: 'Friuli Venezia Giulia',
    codice: 'FVG',
    province: [
      {
        nome: 'Trieste',
        codice: '027',
        codReg: 'FVG',
      },
      {
        nome: 'Udine',
        codice: '028',
        codReg: 'FVG',
      },
      {
        nome: 'Pordenone',
        codice: '029',
        codReg: 'FVG',
      },
      {
        nome: 'Gorizia',
        codice: '030',
        codReg: 'FVG',
      },
    ],
  },
  {
    nome: 'Lazio',
    codice: 'LAZ',
    province: [
      {
        nome: 'Roma',
        codice: '058',
        codReg: 'LAZ',
      },
      {
        nome: 'Latina',
        codice: '059',
        codReg: 'LAZ',
      },
      {
        nome: 'Viterbo',
        codice: '060',
        codReg: 'LAZ',
      },
      {
        nome: 'Frosinone',
        codice: '061',
        codReg: 'LAZ',
      },
    ],
  },
  {
    nome: 'Liguria',
    codice: 'LIG',
    province: [
      {
        nome: 'Genova',
        codice: '010',
        codReg: 'LIG',
      },
      {
        nome: 'Imperia',
        codice: '011',
        codReg: 'LIG',
      },
      {
        nome: 'Savona',
        codice: '012',
        codReg: 'LIG',
      },
      {
        nome: 'La Spezia',
        codice: '013',
        codReg: 'LIG',
      },
    ],
  },
  {
    nome: 'Lombardia',
    codice: 'LOM',
    province: [
      {
        nome: 'Milano',
        codice: '015',
        codReg: 'LOM',
      },
      {
        nome: 'Brescia',
        codice: '017',
        codReg: 'LOM',
      },
      {
        nome: 'Como',
        codice: '013',
        codReg: 'LOM',
      },
      {
        nome: 'Pavia',
        codice: '014',
        codReg: 'LOM',
      },
      {
        nome: 'Monza e Brianza',
        codice: '118',
        codReg: 'LOM',
      },
    ],
  },
  {
    nome: 'Marche',
    codice: 'MAR',
    province: [
      {
        nome: 'Ancona',
        codice: '020',
        codReg: 'MAR',
      },
      {
        nome: 'Macerata',
        codice: '042',
        codReg: 'MAR',
      },
      {
        nome: 'Pesaro e Urbino',
        codice: '041',
        codReg: 'MAR',
      },
      {
        nome: 'Fermo',
        codice: '109',
        codReg: 'MAR',
      },
    ],
  },
  {
    nome: 'Molise',
    codice: 'MOL',
    province: [
      {
        nome: 'Campobasso',
        codice: '070',
        codReg: 'MOL',
      },
      {
        nome: 'Isernia',
        codice: '071',
        codReg: 'MOL',
      },
    ],
  },
  {
    nome: 'Piemonte',
    codice: 'PIE',
    province: [
      {
        nome: 'Torino',
        codice: '001',
        codReg: 'PIE',
      },
      {
        nome: 'Cuneo',
        codice: '004',
        codReg: 'PIE',
      },
      {
        nome: 'Alessandria',
        codice: '003',
        codReg: 'PIE',
      },
      {
        nome: 'Novara',
        codice: '002',
        codReg: 'PIE',
      },
      {
        nome: 'Verbania',
        codice: '104',
        codReg: 'PIE',
      },
      {
        nome: 'Vercelli',
        codice: '112',
        codReg: 'PIE',
      },
    ],
  },
  {
    nome: 'Puglia',
    codice: 'PUG',
    province: [
      {
        nome: 'Bari',
        codice: '072',
        codReg: 'PUG',
      },
      {
        nome: 'Lecce',
        codice: '073',
        codReg: 'PUG',
      },
      {
        nome: 'Taranto',
        codice: '074',
        codReg: 'PUG',
      },
      {
        nome: 'Foggia',
        codice: '075',
        codReg: 'PUG',
      },
      {
        nome: 'Brindisi',
        codice: '076',
        codReg: 'PUG',
      },
      {
        nome: 'Barletta-Andria-Trani',
        codice: '110',
        codReg: 'PUG',
      },
    ],
  },
  {
    nome: 'Sardegna',
    codice: 'SAR',
    province: [
      {
        nome: 'Cagliari',
        codice: '092',
        codReg: 'SAR',
      },
      {
        nome: 'Sassari',
        codice: '090',
        codReg: 'SAR',
      },
      {
        nome: 'Nuoro',
        codice: '091',
        codReg: 'SAR',
      },
      {
        nome: 'Oristano',
        codice: '095',
        codReg: 'SAR',
      },
    ],
  },
  {
    nome: 'Sicilia',
    codice: 'SIC',
    province: [
      {
        nome: 'Palermo',
        codice: '082',
        codReg: 'SIC',
      },
      {
        nome: 'Catania',
        codice: '087',
        codReg: 'SIC',
      },
      {
        nome: 'Messina',
        codice: '083',
        codReg: 'SIC',
      },
      {
        nome: 'Siracusa',
        codice: '089',
        codReg: 'SIC',
      },
      {
        nome: 'Trapani',
        codice: '085',
        codReg: 'SIC',
      },
    ],
  },
  {
    nome: 'Toscana',
    codice: 'TOS',
    province: [
      {
        nome: 'Firenze',
        codice: '048',
        codReg: 'TOS',
      },
      {
        nome: 'Pistoia',
        codice: '050',
        codReg: 'TOS',
      },
      {
        nome: 'Prato',
        codice: '051',
        codReg: 'TOS',
      },
      {
        nome: 'Livorno',
        codice: '049',
        codReg: 'TOS',
      },
      {
        nome: 'Lucca',
        codice: '046',
        codReg: 'TOS',
      },
      {
        nome: 'Arezzo',
        codice: '051',
        codReg: 'TOS',
      },
    ],
  },
  {
    nome: 'Trentino-Alto Adige',
    codice: 'TAA',
    province: [
      {
        nome: 'Trento',
        codice: '022',
        codReg: 'TAA',
      },
      {
        nome: 'Bolzano',
        codice: '021',
        codReg: 'TAA',
      },
    ],
  },
  {
    nome: 'Umbria',
    codice: 'UMB',
    province: [
      {
        nome: 'Perugia',
        codice: '054',
        codReg: 'UMB',
      },
      {
        nome: 'Terni',
        codice: '055',
        codReg: 'UMB',
      },
    ],
  },
  {
    nome: "Valle d'Aosta",
    codice: 'VDA',
    province: [
      {
        nome: 'Aosta',
        codice: '007',
        codReg: 'VDA',
      },
    ],
  },
];
