import {CurrencyList} from "./enums.type";

export type GetItemsDataT = {
  app_id: number;
  currency: CurrencyList;
  tradable: boolean;
}
export interface GetItemsDataI extends GetItemsDataT {}

export type ResponseTransferType = {
  message: string
  code: number
}
