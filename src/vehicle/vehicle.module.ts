import { Module } from '@nestjs/common';
import { VehicleResolver } from './vehicle.resolver';
import { VehicleService } from './vehicle.service';

@Module({
  providers: [VehicleResolver, VehicleService],
})
export class VehicleModule {}
