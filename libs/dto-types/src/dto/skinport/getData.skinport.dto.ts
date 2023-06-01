import {CurrencyList, GetItemsDataI} from "@skinport/dto-types";
import {IsBoolean, IsEnum, IsInt, IsOptional, Min} from "class-validator";

export class GetDataSkinportDto implements GetItemsDataI {
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly app_id: number = 730;

  @IsOptional()
  @IsEnum(CurrencyList)
  readonly currency: CurrencyList = CurrencyList.EUR;

  @IsOptional()
  @IsBoolean()
  readonly tradable: boolean = false;
}
