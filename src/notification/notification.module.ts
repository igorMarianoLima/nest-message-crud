import { Module } from '@nestjs/common';
import { NotificationService } from './adapters/notification-service.service';
import { EmailNotificationService } from './adapters/email-notification.service';
import { SmsNotificationService } from './adapters/sms-notification.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: NotificationService,
      useFactory: (env) => {
        if (env.environment === 'development') {
          return new EmailNotificationService();
        }

        return new SmsNotificationService();
      },
      inject: ['ENV'],
    },
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
