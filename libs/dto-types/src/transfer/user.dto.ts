import {IsNotEmpty, IsNumber, Min} from "class-validator";

export class UserDto{
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  balance!: number;
}
