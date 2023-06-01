import {Injectable} from "@nestjs/common";
import {AxiosRequestConfig} from "axios";
import {CurrencyList, GetItemsDataT} from "@skinport/dto-types";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class ApiService {
  private readonly skinport_url: string = 'https://api.skinport.com/v1/';
  private readonly clientId: string;
  private readonly clientSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.clientId = configService.get('SKINPORT_CLIENT_ID');
    this.clientSecret = configService.get('SKINPORT_CLIENT_SECRET');
  }


  getItems(data: GetItemsDataT): AxiosRequestConfig {
    const encodedData = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
    return {
      headers: {
        Authorization: `Basic (${encodedData})`,
      },
      url: this.skinport_url + 'items',
      method: 'get',
      params: {
        app_id: data.app_id || 730,
        currency: data.currency || CurrencyList.EUR,
        tradable: data.tradable || false,
      }
    };
  }
}
