export interface ErrorParams {
  title: string;
  message: string;
  status?: number;
  debugMessage?: string;
}

export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  extensions?: Record<string, any>;
}
