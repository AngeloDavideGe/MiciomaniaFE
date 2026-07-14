export interface ToggleProps {
  titolo: string;
  icona?: string;
  image?: string;
  menuElementi: MenuElements[];
}

export interface MenuElements {
  azione: Function;
  testo: string;
  icona?: string;
  image?: string;
  condition: boolean;
}

export interface ToggleStyles {
  top?: string;
  height?: string;
  width?: string;
  transform?: string;
  left?: string | number;
  right?: string | number;
  position?: string;
}
