export interface IRequestContext {
  requestId: string;
  userAgent: string;
  startedAt: Date;
  method: string;
  ip: string;
  url: string;
  payload?: string;
}
