import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { getWinstonLogger } from './winston.config';
import { ResponseModel } from '../common/response-model';
import { LogLevels } from './model/log-levels';
import { AuthGuard } from '../common/auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LogLevelChangeRequestDto } from './model/log-level-change.request.dto';

@ApiTags('Logger')
@ApiBearerAuth()
@Controller('logger')
export class LoggerController {
  private loggerInstance = getWinstonLogger();

  @ApiOkResponse({
    description: 'Current logger level',
    schema: {
      properties: {
        status: { type: 'string' },
        response: { type: 'string' },
      },
    },
  })
  @Get('level')
  getLogLevel(): ResponseModel<string> {
    return {
      status: 'success',
      response: this.loggerInstance.level,
    };
  }

  @ApiOkResponse({
    description: 'Change logger level',
    schema: {
      properties: {
        status: { type: 'string' },
        response: { type: 'string' },
      },
    },
  })
  @UseGuards(AuthGuard)
  @Patch('level')
  setLogLevel(@Body() body: LogLevelChangeRequestDto): ResponseModel<string> {
    if (!Object.values(LogLevels).includes(body.level)) {
      throw new BadRequestException(`Invalid log level ${body.level}`);
    }

    this.loggerInstance.level = body.level;
    return {
      status: 'success',
      response: `Log level successfully changed to ${body.level}`,
    };
  }
}
