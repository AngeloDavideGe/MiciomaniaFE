import { effect, WritableSignal } from '@angular/core';

export function compareObjectCustom(obj1: any, obj2: any): boolean {
  if (!obj1 || !obj2) return false;
  else return !Object.keys(obj1).some((key) => obj1[key] !== obj2[key]);
}

export function formatDataCustom(date: Date): Date {
  date.setMilliseconds(0);
  return date;
}

export function clearTimeoutCustom(timeout: any, func: Function): any {
  clearTimeout(timeout);
  return setTimeout(func, 300);
}

export function effectTimeoutCustom<T>(
  signalVar: WritableSignal<T>,
  func: (value: T) => void
): void {
  let timeout: any;

  effect(() => {
    const value: T = signalVar();
    timeout = clearTimeoutCustom(timeout, () => func(value));
  });
}
