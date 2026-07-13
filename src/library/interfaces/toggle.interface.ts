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
  width?: string;
  transform?: string;
  left?: string | number;
  right?: string | number;
  position?: string;
}
