import { Expose } from 'class-transformer';
import { LogLevels } from './log-levels';
import { ApiProperty } from '@nestjs/swagger';

@Expose()
export class LogLevelChangeRequestDto {
  @ApiProperty({
    enum: LogLevels,
  })
  level: LogLevels;
}
