import {AEntity} from "./a.entity";
import {BeforeInsert, Column, Entity, OneToMany} from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import {Min} from "class-validator";
import {TransferEntity} from "./transfer.entity";

@Entity({name: 'user'})
export class UserEntity extends AEntity {
  @Column({
    type: "int"
  })
  @Min(0)
  balance: number;

  @Column({nullable: true})
  name: string = uuidv4();

  @OneToMany(()=> TransferEntity, (transfer)=> transfer.user)
  transfers: TransferEntity[];
}
