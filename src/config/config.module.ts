import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: 'ENV',
      useValue: {
        environment: 'development',
      },
    },
  ],
  exports: ['ENV'],
})
export class ConfigModule {}
