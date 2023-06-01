import {CurrencyList, GetItemsDataI} from "@skinport/dto-types";

export class GetDataSkinportDto implements GetItemsDataI{
  app_id!: number;
  currency!: CurrencyList;
  tradable!: boolean;
}
