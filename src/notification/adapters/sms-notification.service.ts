import { NotificationService } from '../interfaces/notification-service.interface';

export class SmsNotificationService implements NotificationService {
  send(to: string, message: string) {
    console.log(`Sending ${message} to ${to} using sms`);
  }
}
