import { Module } from '@nestjs/common';
import { CylinderModule } from './cylinder/cylinder.module';
import { LoggerModule } from './logger/logger.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [HealthModule, LoggerModule, CylinderModule],
})
export class AppModule {}
