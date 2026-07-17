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
