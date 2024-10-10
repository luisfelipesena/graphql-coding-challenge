import { MakesService } from './service';

describe('MakesService', () => {
  let makesService: MakesService;

  beforeEach(() => {
    makesService = MakesService.getInstance();
    jest.clearAllMocks();
  });

  describe('parseMakes', () => {
    it('should parse XML data into Make objects', () => {
      const mockXmlData = {
        Response: {
          Results: [
            {
              AllVehicleMakes: [
                {
                  Make_ID: ['1'],
                  Make_Name: ['Toyota'],
                },
                {
                  Make_ID: ['2'],
                  Make_Name: ['Honda'],
                },
              ],
            },
          ],
        },
      };

      const result = (makesService as any).parseMakes(mockXmlData);

      expect(result).toEqual([
        { id: 1, name: 'Toyota' },
        { id: 2, name: 'Honda' },
      ]);
    });

    it('should return an empty array if no makes are found', () => {
      const mockXmlData = {
        Response: {
          Results: [{}],
        },
      };

      const result = (makesService as any).parseMakes(mockXmlData);

      expect(result).toEqual([]);
    });
  });
});
