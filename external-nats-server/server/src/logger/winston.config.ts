import { createLogger, format, Logger, transports } from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

const loggerInstance: Logger = createLogger({
  level: 'info',
  transports: new transports.Console(),
  format: format.combine(
    format.timestamp(),
    nestWinstonModuleUtilities.format.nestLike(),
  ),
});

export function getWinstonLogger(): Logger {
  return loggerInstance;
}
