import { VehicleType } from 'vehicle/vehicle.types';
import { db } from '../index';
import { vehicleTypes } from '../schema';

export class VehicleTypesRepository {
  private readonly vehicleTypes = vehicleTypes;

  async findAll(): Promise<VehicleType[]> {
    const vehicleTypes = await db.select().from(this.vehicleTypes);
    return vehicleTypes.map((vehicleType) => ({
      typeId: vehicleType.id,
      typeName: vehicleType.name,
    }));
  }
}
