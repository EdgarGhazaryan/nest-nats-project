import { Module } from '@nestjs/common';
import { CylinderController } from './cylinder.controller';
import { CylinderService } from './cylinder.service';
import { AreaComputerModule } from '../external/area-computer/area-computer.module';

@Module({
  imports: [AreaComputerModule],
  controllers: [CylinderController],
  providers: [CylinderService],
})
export class CylinderModule {}
