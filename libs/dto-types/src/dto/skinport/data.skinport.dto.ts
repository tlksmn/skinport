import {CurrencyList} from "@skinport/dto-types";
import {IsDate, IsEnum, IsInt, IsString, Min} from "class-validator";

export class DataSkinportDto {
  @IsString()
  market_hash_name!: string;

  @IsEnum(CurrencyList)
  currency!: CurrencyList

  @IsInt()
  @Min(0)
  suggested_price!: number;

  @IsString()
  item_page!: string;

  @IsString()
  market_page!: string;

  @IsInt()
  @Min(0)
  min_price!: number;

  @IsInt()
  @Min(0)
  max_price!: number;

  @IsInt()
  @Min(0)
  mean_price!: number;

  @IsInt()
  @Min(0)
  quantity!: number;

  @IsDate()
  created_at!: Date;

  @IsDate()
  updated_at!: Date;
}

interface DataSkinportResponseI extends DataSkinportDto {
}

export type DataSkinportResponseT = DataSkinportResponseI

