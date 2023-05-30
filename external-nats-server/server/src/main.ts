import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from './logger/winston.config';
import { configNestApp } from './nest-app.utils';

(async () => {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: getWinstonLogger(),
    }),
  });

  app.connectMicroservice({
    transport: Transport.NATS,
    options: {
      servers: [process.env.EXTERNAL_NATS_SERVER],
    },
  });

  configNestApp(app);

  await app.startAllMicroservices();

  await app.listen(process.env.SERVER_PORT);
})();
