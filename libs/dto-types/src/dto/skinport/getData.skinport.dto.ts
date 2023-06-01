import {CurrencyList, GetItemsDataI} from "@skinport/dto-types";
import {IsBoolean, IsEnum, IsOptional} from "class-validator";
import {Transform, Type} from "class-transformer";

export class GetDataSkinportDto implements GetItemsDataI {
  @IsOptional()
  @Type(() => Number)
  readonly app_id: number = 730;

  @IsOptional()
  @IsEnum(CurrencyList)
  readonly currency: CurrencyList = CurrencyList.EUR;

  @IsOptional()
  // @IsBoolean()
  // @Type(() => Boolean)
  @Transform((value) => {
    // console.log(value)
    return value.value === "true"
  })
  readonly tradable: boolean = false;
}
