export interface PulsanteNavbar {
  id: string;
  icon: string;
  text: string;
  azione: Function;
}

export interface iTab {
  id: string;
  label?: string;
  color?: string;
  icona?: string;
  azione?: (id?: string) => void;
}

export interface ISidebarItem {
  id: string;
  nome: string;
  icona: string;
}
