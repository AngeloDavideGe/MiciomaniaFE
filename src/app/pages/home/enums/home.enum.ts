import { WritableSignal } from '@angular/core';

export enum CompAperto {
  cursore = 'cursore',
  menuBar = 'menuBar',
  profili = 'profili',
}

export type recordComp = Record<CompAperto, WritableSignal<boolean>>;

export function compApertoFunc(call: Function): void {
  Object.keys(CompAperto).forEach((x) => call(x as keyof typeof CompAperto));
}
