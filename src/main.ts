import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { EnvironmentVariables } from './env.validation';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger("MainApplication");

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);
  const globalPrefix = "api";

  
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = configService.get("PORT");
  app.enableCors();
  await app.listen(port, () => {
    logger.log(`Listening API at http://localhost:${port}/${globalPrefix}`);
  });
}
bootstrap();
