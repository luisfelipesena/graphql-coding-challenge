import { parseStringPromise } from "xml2js";

export class XmlService {
	private static instance: XmlService;

	public static getInstance(): XmlService {
		if (!XmlService.instance) {
			XmlService.instance = new XmlService();
		}
		return XmlService.instance;
	}
	async parseXml(xml: string): Promise<any> {
		const parser = await parseStringPromise(xml);
		return parser;
	}
}
