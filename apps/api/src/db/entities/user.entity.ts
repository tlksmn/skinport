import {AEntity} from "./a.entity";
import {Column, ManyToOne} from "typeorm";
import {Min} from "class-validator";
import {TransferEntity} from "./transfer.entity";

export class UserEntity extends AEntity {
  @Column({
    type: "int"
  })
  @Min(0)
  balance: number;

  @ManyToOne(()=> TransferEntity, (transfer)=> transfer.user)
  transfers: TransferEntity[];
}
