import { Make } from "../makes/types";
import { VehicleType } from "../vehicle-types/types";

interface OutputVehicleType {
	typeId: number;
	typeName: string;
}

interface OutputMake {
	makeId: number;
	makeName: string;
	vehicleTypes: OutputVehicleType[];
}

export class OutputService {
	generateOutput(makes: Make[], vehicleTypes: VehicleType[]): OutputMake[] {
		return makes.map((make) => ({
			makeId: make.id,
			makeName: make.name,
			vehicleTypes: vehicleTypes
				.filter((vt) => vt.makeId === make.id)
				.map((vt) => ({
					typeId: vt.id,
					typeName: vt.name,
				})),
		}));
	}
}
