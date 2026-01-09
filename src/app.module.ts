import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from './person/person.module';
import { LoggerModule } from './logger/logger.module';
import { RequestContextMiddleware } from './common/middlewares/RequestContext.middleware';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLoggerInterceptor } from './common/interceptors/RequestLogger.interceptor';
import { ExceptionLoggingFilter } from './common/filters/ExceptionLoggingFilter.filter';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const environment = configService.getEnvironment();
        const db = configService.getDatabase();

        return {
          type: 'postgres',
          host: db.host,
          database: db.database,
          username: db.username,
          password: db.password,
          port: db.port,
          synchronize: environment === 'development',
          autoLoadEntities: true,
        };
      },
    }),
    MessageModule,
    PersonModule,
    LoggerModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: RequestLoggerInterceptor },
    { provide: APP_FILTER, useClass: ExceptionLoggingFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes({
      method: RequestMethod.ALL,
      path: '*',
    });
  }
}
