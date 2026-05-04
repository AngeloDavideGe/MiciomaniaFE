export enum StatoPersona {
  Gettato = 'Gettato',
  Deriso = 'Deriso',
  Umiliato = 'Umiliato',
}

export const BadgeStatoPersona: Record<StatoPersona, string> = {
  Gettato: 'bg-success text-white rounded-pill px-2 py-1 text-center',
  Deriso: 'bg-warning text-white rounded-pill px-2 py-1 text-center',
  Umiliato: 'bg-danger text-white rounded-pill px-2 py-1 text-center',
};

export enum Ruolo {
  miciomane = 'miciomane',
  admin = 'admin',
  player = 'player',
  user = 'user',
}

export const BadgeRuolo: Record<Ruolo, string> = {
  miciomane: 'bg-primary text-white rounded-pill px-2 py-1 text-center',
  admin: 'bg-secondary text-white rounded-pill px-2 py-1 text-center',
  player: 'bg-info text-white rounded-pill px-2 py-1 text-center',
  user: 'bg-danger text-dark rounded-pill px-2 py-1 text-center',
};
