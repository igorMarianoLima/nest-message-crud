import { NotificationService } from './notification-service.service';

export class SmsNotificationService implements NotificationService {
  send(to: string, message: string) {
    console.log(`Sending ${message} to ${to} using sms`);
  }
}
