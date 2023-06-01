import {AEntity} from "./a.entity";
import {Column, Entity, OneToMany} from "typeorm";
import {Min} from "class-validator";
import {TransferEntity} from "./transfer.entity";

@Entity({name: 'user'})
export class UserEntity extends AEntity {
  @Column({
    type: "int"
  })
  @Min(0)
  balance: number;

  @OneToMany(()=> TransferEntity, (transfer)=> transfer.user)
  transfers: TransferEntity[];
}
