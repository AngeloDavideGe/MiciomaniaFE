export function compareObjectCustom(obj1: any, obj2: any): boolean {
  if (!obj1 || !obj2) return false;
  else return !Object.keys(obj1).some((key) => obj1[key] !== obj2[key]);
}

export function formatDataCustom(date: Date): Date {
  date.setMilliseconds(0);
  return date;
}
