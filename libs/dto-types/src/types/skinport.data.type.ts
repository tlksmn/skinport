export enum CurrencyList {
  EUR = "EUR",
  AUD = "AUD",
  BRL = "BRL",
  CAD = "CAD",
  CHF = "CHF",
  CNY = "CNY",
  CZK = "CZK",
  DKK = "DKK",
  GBP = "GBP",
  HRK = "HRK",
  NOK = "NOK",
  PLN = "PLN",
  RUB = "RUB",
  SEK = "SEK",
  TRY = "TRY",
  USD = "USD",
}
export type GetItemsDataT = {
  app_id: number;
  currency: CurrencyList;
  tradable: boolean;
}
export interface GetItemsDataI extends GetItemsDataT {}
