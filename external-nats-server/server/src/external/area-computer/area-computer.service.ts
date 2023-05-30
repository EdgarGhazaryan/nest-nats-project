import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AreaComputerService {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  async getCylinderArea(radius: number, height: number): Promise<number> {
    return lastValueFrom(
      this.client.send(process.env.COMPUTE_NATS_TOPIC, {
        radius,
        height,
      }),
    );
  }
}
