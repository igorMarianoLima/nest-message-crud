import { NotificationService } from '../interfaces/notification-service.interface';

export class EmailNotificationService implements NotificationService {
  send(to: string, message: string) {
    console.log(`Sending ${message} to ${to} using e-mail...`);
  }
}
