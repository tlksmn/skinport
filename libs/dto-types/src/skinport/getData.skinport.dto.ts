import {IsBoolean, IsEnum, IsOptional} from "class-validator";
import {Transform, Type} from "class-transformer";
import {CurrencyList, GetItemsDataI} from "@skinport/dto";

export class GetDataSkinportDto implements GetItemsDataI {
  @IsOptional()
  @Type(() => Number)
  readonly app_id: number = 730;

  @IsOptional()
  @IsEnum(CurrencyList)
  readonly currency: CurrencyList = CurrencyList.EUR;

  @IsOptional()
  @Transform((value) => {
    return value.value === "true"
  })
  readonly tradable: boolean = false;
}
