import { Injectable } from '@nestjs/common';
import { AreaComputerService } from '../external/area-computer/area-computer.service';

@Injectable()
export class CylinderService {
  constructor(private readonly areaComputerService: AreaComputerService) {}

  async getCylinderArea(radius: number, height: number): Promise<number> {
    return this.areaComputerService.getCylinderArea(radius, height);
  }
}
