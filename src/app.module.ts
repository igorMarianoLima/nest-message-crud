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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_SCHEMA,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development',
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
