import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

(async () => {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.NATS,
    options: {
      servers: [process.env.NATS_SERVER],
    },
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.startAllMicroservices();

  await app.listen(process.env.SERVER_PORT);
})();
