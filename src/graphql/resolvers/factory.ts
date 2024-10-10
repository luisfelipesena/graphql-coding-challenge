import { OutputResolver } from "./output/resolver";

export class ResolverFactory {
	static createResolvers(): [Function, ...Function[]] {
		return [OutputResolver];
	}
}
