import {TransferTypeEnum} from "../../types";
import {IsEnum, IsInt, IsNotEmpty, IsString, Min} from "class-validator";

export class TransferDto {
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  readonly user_id: number = 1;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  readonly amount: number = 0;

  @IsNotEmpty()
  @IsEnum(TransferTypeEnum)
  readonly action: TransferTypeEnum = TransferTypeEnum.BUY;


  @IsString()
  readonly ts: string = '';
}
