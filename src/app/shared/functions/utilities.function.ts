import { effect, WritableSignal } from '@angular/core';

// Confronta Oggetti
export function compareObjectCustom(obj1: any, obj2: any): boolean {
  if (!obj1 || !obj2) return false;
  else return !Object.keys(obj1).some((key) => obj1[key] !== obj2[key]);
}

// Formatta Data
export function formatDataCustom(date: Date): Date {
  date.setMilliseconds(0);
  return date;
}

// Debounce Custom
export function debounceTimeoutCustom<T extends (...args: any[]) => void>(
  func: T
): Function {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    timeoutId = clearTimeoutCustom(timeoutId, () => func(...args));
  };
}

export function effectTimeoutCustom<T>(
  signalVar: WritableSignal<T>,
  func: (value: T) => void
): void {
  let timeout: ReturnType<typeof setTimeout>;

  effect(() => {
    const value: T = signalVar();
    timeout = clearTimeoutCustom(timeout, () => func(value));
  });
}

function clearTimeoutCustom(timeout: any, func: Function): any {
  clearTimeout(timeout);
  return setTimeout(func, 300);
}
