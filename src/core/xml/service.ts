import axios, { AxiosInstance } from 'axios';
import { parseStringPromise } from 'xml2js';

export class XmlService {
    private static instance: XmlService;
    private readonly axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create();
    }

    public static getInstance(): XmlService {
        if (!XmlService.instance) {
            XmlService.instance = new XmlService();
        }
        return XmlService.instance;
    }

    async fetchXml<ResponseData = any>(url: string): Promise<ResponseData> {
        const response = await this.axiosInstance.get(url);
        return this.parseXml<ResponseData>(response.data);
    }

    private async parseXml<ResponseData = any>(xml: string): Promise<ResponseData> {
        const parser = await parseStringPromise(xml);
        return parser;
    }
}
