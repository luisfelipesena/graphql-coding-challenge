import { Make } from 'vehicle/vehicle.types';
import { db } from '../index';
import { makes } from '../schema';

export class MakesRepository {
  private readonly makes = makes;

  async findAll(): Promise<Make[]> {
    return db.select().from(this.makes);
  }
}
