import { VehicleTypesService } from './service';
import { VehicleTypesClient } from './client';
import { XmlService } from '../../common/xml/service';

jest.mock('./client');
jest.mock('../../common/xml/service');

describe('VehicleTypesService', () => {
  let vehicleTypesService: VehicleTypesService;
  let mockClient: jest.Mocked<VehicleTypesClient>;
  let mockXmlService: jest.Mocked<XmlService>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockClient = new VehicleTypesClient() as jest.Mocked<VehicleTypesClient>;
    mockXmlService = {
      getInstance: jest.fn().mockReturnThis(),
      parseXml: jest.fn(),
    } as unknown as jest.Mocked<XmlService>;

    (VehicleTypesClient as jest.Mock).mockImplementation(() => mockClient);
    (XmlService.getInstance as jest.Mock).mockReturnValue(mockXmlService);

    vehicleTypesService = VehicleTypesService.getInstance();
  });

  describe('getAllVehicleTypesByMakeId', () => {
    it('should fetch and parse vehicle types successfully', async () => {
      const mockMakeId = 123;
      const mockXmlData = '<xml>Some XML data</xml>';
      const mockParsedData = {
        Response: {
          Results: [
            {
              VehicleTypesForMakeIds: [
                { VehicleTypeId: ['1'], VehicleTypeName: ['Sedan'] },
                { VehicleTypeId: ['2'], VehicleTypeName: ['SUV'] },
              ],
            },
          ],
        },
      };

      mockClient.getAllVehicleTypesByMakeId.mockResolvedValue(mockXmlData);
      mockXmlService.parseXml.mockResolvedValue(mockParsedData);

      const result = await vehicleTypesService.getAllVehicleTypesByMakeId(mockMakeId);

      expect(result).toEqual({
        success: true,
        message: 'Vehicle types fetched successfully',
        data: [
          { id: 1, name: 'Sedan' },
          { id: 2, name: 'SUV' },
        ],
      });

      expect(mockClient.getAllVehicleTypesByMakeId).toHaveBeenCalledWith(mockMakeId);
      expect(mockXmlService.parseXml).toHaveBeenCalledWith(mockXmlData);
    });

    it('should handle errors and return a failure response', async () => {
      const mockMakeId = 123;
      const mockError = new Error('API error');

      mockClient.getAllVehicleTypesByMakeId.mockRejectedValue(mockError);

      const result = await vehicleTypesService.getAllVehicleTypesByMakeId(mockMakeId);

      expect(result).toEqual({
        success: false,
        message: 'API error',
      });
    });
  });

  describe('parseVehicleTypes', () => {
    it('should parse vehicle types correctly', () => {
      const mockData = {
        Response: {
          Results: [
            {
              VehicleTypesForMakeIds: [
                { VehicleTypeId: ['1'], VehicleTypeName: ['Sedan'] },
                { VehicleTypeId: ['2'], VehicleTypeName: ['SUV'] },
              ],
            },
          ],
        },
      };

      const result = (vehicleTypesService as any).parseVehicleTypes(mockData);

      expect(result).toEqual([
        { id: 1, name: 'Sedan' },
        { id: 2, name: 'SUV' },
      ]);
    });

    it('should return an empty array when no vehicle types are found', () => {
      const mockData = {
        Response: {
          Results: [{}],
        },
      };

      const result = (vehicleTypesService as any).parseVehicleTypes(mockData);

      expect(result).toEqual([]);
    });
  });
});
