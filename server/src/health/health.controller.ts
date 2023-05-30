import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { NatsOptions, Transport } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private microservice: MicroserviceHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  checkHealth() {
    return this.healthCheckService.check([
      () =>
        this.microservice.pingCheck<NatsOptions>('MATH_SERVICE', {
          transport: Transport.NATS,
          options: {
            servers: [process.env.EXTERNAL_NATS_SERVER],
          },
        }),
    ]);
  }
}
