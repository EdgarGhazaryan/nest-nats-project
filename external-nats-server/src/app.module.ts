import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrometheusModule } from 'nestjs-prometheus';

@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
        config: {
          prefix: 'external_nats_server_',
        },
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
