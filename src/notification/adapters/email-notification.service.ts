import { NotificationService } from './notification-service.service';

export class EmailNotificationService implements NotificationService {
  send(to: string, message: string) {
    console.log(`Sending ${message} to ${to} using e-mail...`);
  }
}
