import {CurrencyList, TransferResultTypeEnum, TransferTypeEnum} from "./enums.type";

export class DataSkinportDtoDec {
  market_hash_name!: string;
  currency!: CurrencyList
  suggested_price!: number;
  item_page!: string;
  market_page!: string;
  min_price!: number;
  max_price!: number;
  mean_price!: number;
  quantity!: number;
  created_at!: Date;
  updated_at!: Date;
}

class BaseDtoT {
  id!: number
  created!: Date;
  updated!: Date
}

export class UserDto extends BaseDtoT{
  balance!: number
  name!: string
  transfers!: TransferDto[]
}

export type CreateUserType = {
  balance?: number|null;
}

export type TransferAmountType = {
  user_id: number;
  amount: number;
  ts: string;
  action: TransferTypeEnum
}

export class TransferDto extends BaseDtoT{
  user!: UserDto
  amount!: number
  ts!: string;
  status!: TransferResultTypeEnum;
  action!: TransferTypeEnum;
}
