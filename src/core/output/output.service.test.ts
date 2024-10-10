import { OutputService } from './service';
import { VehicleTypesRepository } from '../../db/repository/vehicle-types/repository';

jest.mock('../../db/repository/vehicle-types/repository');

describe('OutputService', () => {
  let outputService: OutputService;
  let mockVehicleTypesRepository: jest.Mocked<VehicleTypesRepository>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockVehicleTypesRepository = {
      getInstance: jest.fn().mockReturnThis(),
      getOutputItems: jest.fn(),
      getOutputItem: jest.fn(),
    } as unknown as jest.Mocked<VehicleTypesRepository>;

    (VehicleTypesRepository.getInstance as jest.Mock).mockReturnValue(mockVehicleTypesRepository);

    // Reset the singleton instance before each test
    (OutputService as any).instance = null;
    outputService = OutputService.getInstance();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllMakesWithVehicleTypes', () => {
    it('should return all makes with vehicle types', async () => {
      const mockOutputItems = [
        { makeId: 1, makeName: 'Toyota', vehicleTypes: [{ typeId: 1, typeName: 'Sedan' }] },
        { makeId: 2, makeName: 'Honda', vehicleTypes: [{ typeId: 2, typeName: 'SUV' }] },
      ];

      mockVehicleTypesRepository.getOutputItems.mockResolvedValue(mockOutputItems);

      const result = await outputService.getAllMakesWithVehicleTypes();

      expect(result).toEqual(mockOutputItems);
      expect(mockVehicleTypesRepository.getOutputItems).toHaveBeenCalledTimes(1);
    });
  });

  describe('getMakeWithVehicleTypes', () => {
    it('should return a specific make with its vehicle types', async () => {
      const mockMakeId = 1;
      const mockOutputItem = {
        makeId: 1,
        makeName: 'Toyota',
        vehicleTypes: [{ typeId: 1, typeName: 'Sedan' }],
      };

      mockVehicleTypesRepository.getOutputItem.mockResolvedValue(mockOutputItem);

      const result = await outputService.getMakeWithVehicleTypes(mockMakeId);

      expect(result).toEqual(mockOutputItem);
      expect(mockVehicleTypesRepository.getOutputItem).toHaveBeenCalledWith(mockMakeId);
      expect(mockVehicleTypesRepository.getOutputItem).toHaveBeenCalledTimes(1);
    });

    it('should return null if the make is not found', async () => {
      const mockMakeId = 999;

      mockVehicleTypesRepository.getOutputItem.mockResolvedValue(null);

      const result = await outputService.getMakeWithVehicleTypes(mockMakeId);

      expect(result).toBeNull();
      expect(mockVehicleTypesRepository.getOutputItem).toHaveBeenCalledWith(mockMakeId);
      expect(mockVehicleTypesRepository.getOutputItem).toHaveBeenCalledTimes(1);
    });
  });
});
