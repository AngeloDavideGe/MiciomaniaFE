import { effect, WritableSignal } from '@angular/core';

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
