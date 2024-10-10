import { MakesResolver } from "./makes/resolver";
import { VehicleTypesResolver } from "./vehicle-types/resolver";

export class ResolverFactory {
	static createResolvers(): [Function, ...Function[]] {
		return [MakesResolver, VehicleTypesResolver];
	}
}
