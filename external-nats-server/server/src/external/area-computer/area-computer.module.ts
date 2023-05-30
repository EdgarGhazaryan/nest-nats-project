import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AreaComputerService } from './area-computer.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [process.env.EXTERNAL_NATS_SERVER],
        },
      },
    ]),
  ],
  providers: [AreaComputerService],
  exports: [AreaComputerService],
})
export class AreaComputerModule {}
