import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CylinderAreaDto } from './model/cylinder-area.dto';
import { MetricsInterceptor } from './inteceptor/metrics.interceptor';

@Controller()
@UseInterceptors(MetricsInterceptor)
export class AppController {
  @MessagePattern('area.compute')
  computeCylinderArea(@Payload() data: CylinderAreaDto): number {
    return 2 * Math.PI * data.height * (data.radius + data.height);
  }
}
