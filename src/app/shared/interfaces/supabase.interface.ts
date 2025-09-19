export interface RealtimePayload<T> {
  // commit_timestamp: string;
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new: T | null;
  // old: T | null;
  // schema: string;
  // table: string;
  // errors: string[] | null;
}
