export interface iTab {
  id: string;
  label?: string;
  color?: string;
  icona?: string;
  azione?: (id?: string) => void;
}
