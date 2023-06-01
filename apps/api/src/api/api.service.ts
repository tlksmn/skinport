import {Injectable} from "@nestjs/common";
import {AxiosRequestConfig} from "axios";
import {CurrencyList, GetItemsDataT} from "@skinport/dto-types";

@Injectable()
export class ApiService{
  private readonly skinport_url: string = 'https://api.skinport.com/v1/';
  getItems(data: GetItemsDataT): AxiosRequestConfig{
    return  {
      url: this.skinport_url + 'items',
      method: 'get',
      params: {
        app_id: data.app_id || 730,
        currency: data.currency || CurrencyList.EUR,
        tradable: data.tradable || false
      }
    }
  }
}
