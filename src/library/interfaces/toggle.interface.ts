export interface ToggleProps {
  titolo: string;
  icona?: string;
  menuElementi: MenuElements[];
}

export interface MenuElements {
  azione: Function;
  testo: string;
  icona?: string;
  condition: boolean;
}

export interface ToggleStyles {
  top?: string;
  left?: number;
  width?: string;
}
