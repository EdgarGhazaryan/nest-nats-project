import { Controller, Get, Logger, Query } from '@nestjs/common';
import { CylinderService } from './cylinder.service';
import { ResponseModel } from '../common/response-model';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cylinder')
@Controller('cylinder')
export class CylinderController {
  constructor(private readonly cylinderService: CylinderService) {}

  private logger = new Logger(CylinderController.name);

  @ApiOkResponse({
    description: 'Cylinder area for provided radius and height',
    schema: {
      properties: {
        status: { type: 'string' },
        response: { type: 'number' },
      },
    },
  })
  @Get('area')
  async getArea(
    @Query('radius') radius: number,
    @Query('height') height: number,
  ): Promise<ResponseModel<number>> {
    this.logger.log(`Received request for radius ${radius} height ${height}`);

    const area = await this.cylinderService.getCylinderArea(radius, height);

    this.logger.debug(`Area for radius ${radius} height ${height} is ${area}`);

    return {
      status: 'success',
      response: area,
    };
  }
}
