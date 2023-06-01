import {CurrencyList, GetItemsDataI} from "@skinport/dto-types";
import {IsEnum, IsOptional} from "class-validator";

export class GetDataSkinportDto implements GetItemsDataI {
  @IsOptional()
  // @Type(()=> Number)
  readonly app_id: number = 730;

  @IsOptional()
  @IsEnum(CurrencyList)
  readonly currency: CurrencyList = CurrencyList.EUR;

  @IsOptional()
  // @Type(()=> Boolean)
  readonly tradable: boolean = false;
}
