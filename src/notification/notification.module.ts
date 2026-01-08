import { Module } from '@nestjs/common';
import { NotificationService } from './adapters/notification-service.service';
import { EmailNotificationService } from './adapters/email-notification.service';
import { SmsNotificationService } from './adapters/sms-notification.service';

@Module({
  imports: [],
  providers: [
    {
      provide: NotificationService,
      useFactory: () => {
        if (process.env.NODE_ENV === 'development') {
          return new EmailNotificationService();
        }

        return new SmsNotificationService();
      },
    },
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
