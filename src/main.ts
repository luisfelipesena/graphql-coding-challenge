import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VehicleTypesRepository } from './db/vehicleTypes/repository';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}

/**
 * Test repository
 */

const test = async () => {
  const vehicleTypesRepository = new VehicleTypesRepository();
  const vehicleTypes = await vehicleTypesRepository.findAll();
  console.log({ vehicleTypes });
};

test();

bootstrap();
