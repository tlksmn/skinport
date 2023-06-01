import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {TransferResultTypeEnum, TransferTypeEnum} from "@skinport/dto-types";
import {Min} from "class-validator";
import {UserEntity} from "./user.entity";
import {AEntity} from "./a.entity";

@Entity({name: 'transfer'})
export class TransferEntity extends AEntity{
  @Column({
    type: 'int',
  })
  @Min(0)
  amount: number;

  @Column()
  ts: string;

  @Column({
    type: "enum",
    enum: TransferResultTypeEnum
  })
  status: TransferResultTypeEnum;

  @Column({
    type: "enum",
    enum: TransferTypeEnum
  })
  action: TransferTypeEnum;

  @ManyToOne(() => UserEntity, (user) => user.transfers)
  user: UserEntity;
}
