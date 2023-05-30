import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DefaultErrorFilter, HttpExceptionFilter } from './exception.filter';

export function configNestApp(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new DefaultErrorFilter(), new HttpExceptionFilter());

  swaggerConfiguration(app);
}

function swaggerConfiguration(app) {
  const config = new DocumentBuilder()
    .setTitle('HTTP server')
    .setDescription('HTTP server using NATS')
    .setVersion('1.0')
    .addServer('http://localhost:3001', 'local')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
}
