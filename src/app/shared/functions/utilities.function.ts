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
  func: T,
  first: boolean = false,
  delay: number = 500,
): Function {
  let timeoutId: ReturnType<typeof setTimeout>;
  let isFirstClick: boolean = true;

  if (first) {
    return (...args: Parameters<T>) => {
      const setFunc: Function = () => {
        isFirstClick = false;
        func(...args);
        setTimeout(() => (isFirstClick = true), delay);
      };

      if (isFirstClick) {
        setFunc();
      } else {
        timeoutId = clearTimeoutCustom(timeoutId, () => setFunc(), delay);
      }
    };
  } else {
    return (...args: Parameters<T>) => {
      timeoutId = clearTimeoutCustom(timeoutId, () => func(...args));
    };
  }
}

export function effectTimeoutCustom<T>(
  signalVar: WritableSignal<T>,
  func: (value: T) => void,
  delay: number = 300,
  first: boolean = false,
): void {
  let timeoutId: ReturnType<typeof setTimeout>;
  let isFirstClick: boolean = true;

  effect(() => {
    const value: T = signalVar();

    const setFunc: Function = () => {
      isFirstClick = false;
      func(value);
      setTimeout(() => (isFirstClick = true), delay);
    };

    if (first) {
      if (isFirstClick) {
        setFunc();
      } else {
        timeoutId = clearTimeoutCustom(timeoutId, () => setFunc(), delay);
      }
    } else {
      timeoutId = clearTimeoutCustom(timeoutId, () => func(value), delay);
    }
  });
}

function clearTimeoutCustom(
  timeout: ReturnType<typeof setTimeout>,
  func: Function,
  delay: number = 300,
): any {
  clearTimeout(timeout);
  return setTimeout(func, delay);
}

// Ordinamento Custom
export function GetOrderCustom<T>(vett: T[], k: keyof T, desc: boolean): T[] {
  switch (typeof vett[0][k]) {
    case 'number': {
      if (desc) {
        return vett.sort((a: T, b: T) => (a[k] as number) - (b[k] as number));
      } else {
        return vett.sort((a: T, b: T) => (b[k] as number) - (a[k] as number));
      }
    }
    case 'string': {
      if (desc) {
        return vett.sort((a: T, b: T) =>
          (a[k] as string).localeCompare(b[k] as string),
        );
      } else {
        return vett.sort((a: T, b: T) =>
          (b[k] as string).localeCompare(a[k] as string),
        );
      }
    }
    default:
      return vett;
  }
}
