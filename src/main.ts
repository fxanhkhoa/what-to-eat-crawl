import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ReflectionService } from '@grpc/reflection';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        onLoadPackageDefinition: (pkg, server) => {
          new ReflectionService(pkg).addToServer(server);
        },
        url: `0.0.0.0:${process.env.PORT ?? 9000}`,
        package: ['dmx_food'],
        protoPath: [join(__dirname, './proto/dmx_food.proto')],
      },
    },
  );

  await app.listen();
  logger.log(`Microservice is running on: ${process.env.PORT ?? 9000}`);
}
bootstrap();
