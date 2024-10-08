import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import {
  JsonExportType,
  MakesResponse,
  VehicleTypesForMakeIdResponse,
} from './vehicle.types';
import fs from 'fs';
@Injectable()
export class VehicleService {
  private async sendVehicleTypesForMakeIdRequest(makeId: string): Promise<any> {
    try {
      const pageResponse = await axios.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`,
      );
      return pageResponse.data;
    } catch (error) {
      console.error({ error });
      const sampleData = fs.readFileSync(
        '../../sample-data/getVehicleTypesForMakeId-440.xml',
        'utf8',
      );
      return sampleData;
    }
  }

  private async sendAllMakesRequest(): Promise<any> {
    try {
      const pageResponse = await axios.get(
        'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=xml',
      );
      return pageResponse.data;
    } catch (error) {
      console.error({ error });
      const sampleData = fs.readFileSync(
        '../../sample-data/getallmakes.xml',
        'utf8',
      );
      return sampleData;
    }
  }

  private async parseVehicleTypesForMakeId(
    vehicleTypesForMakeIdResponse: any,
  ): Promise<VehicleTypesForMakeIdResponse> {
    const vehicleTypesForMakeId = await parseStringPromise(
      vehicleTypesForMakeIdResponse,
    );

    const count = Number(vehicleTypesForMakeId.Response.Count[0]);
    const message = vehicleTypesForMakeId.Response.Message[0]?.trim();

    const results =
      vehicleTypesForMakeId.Response.Results[0].VehicleTypesForMakeIds?.map(
        (make: any) => {
          return {
            typeId: Number(make.VehicleTypeId),
            typeName: `${make.VehicleTypeName}`.trim(),
          };
        },
      ) ?? [];

    return { count, message, results };
  }

  private async parseMakes(makesResponse: any): Promise<MakesResponse> {
    const makes = await parseStringPromise(makesResponse);
    const count = Number(makes.Response.Count[0]);
    const message = makes.Response.Message[0]?.trim();
    const results =
      makes.Response.Results[0].AllVehicleMakes?.map((make: any) => {
        return {
          id: Number(make.Make_ID),
          name: `${make.Make_Name}`.trim(),
        };
      }) ?? [];

    return { count, message, results };
  }

  async getVehicleTypesForMakeId(
    makeId: string,
  ): Promise<VehicleTypesForMakeIdResponse> {
    const vehicleTypesForMakeIdResponse =
      await this.sendVehicleTypesForMakeIdRequest(makeId);

    const vehicleTypesForMakeId = await this.parseVehicleTypesForMakeId(
      vehicleTypesForMakeIdResponse,
    );
    return vehicleTypesForMakeId;
  }

  async getMakes(): Promise<MakesResponse> {
    const makesResponse = await this.sendAllMakesRequest();
    const makes = await this.parseMakes(makesResponse);
    return makes;
  }

  async exportJson(): Promise<JsonExportType[]> {
    const makes = await this.getMakes();
    const finalArray: JsonExportType[] = [];

    for (const make of makes.results) {
      const vehicleTypes = await this.getVehicleTypesForMakeId(
        make.id.toString(),
      );

      const jsonExportType = {
        makeId: make.id,
        makeName: make.name,
        vehicleTypes: vehicleTypes.results,
      };

      console.log({ jsonExportType });
      finalArray.push(jsonExportType);
    }

    return finalArray;
  }
}
