export abstract class NotificationService {
  send: (to: string, message: string) => void;
}
