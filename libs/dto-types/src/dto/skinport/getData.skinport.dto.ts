import {CurrencyList, GetItemsDataI} from "@skinport/dto-types";
import {IsBoolean, IsEnum, IsInt, IsOptional, Min} from "class-validator";

export class GetDataSkinportDto implements GetItemsDataI {
  @IsOptional()
  @IsInt()
  @Min(0)
  app_id!: number;

  @IsOptional()
  @IsEnum(CurrencyList)
  currency!: CurrencyList;

  @IsOptional()
  @IsBoolean()
  tradable!: boolean;
}
