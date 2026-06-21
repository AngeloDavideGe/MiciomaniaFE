export enum CampiCron {
  hour = 'hour',
  dayOfWeek = 'dayOfWeek',
  month = 'month',
}

export type CronObbligatori = Partial<Record<CampiCron, boolean>>;

export interface ErrorCronObbligatori extends CronObbligatori {
  button: boolean;
}
