import {Column, Entity, OneToMany} from "typeorm";
import {TransferResultTypeEnum, TransferTypeEnum} from "@skinport/dto-types";
import {Min} from "class-validator";
import {UserEntity} from "./user.entity";

@Entity()
export class TransferEntity {
  @Column({
    type: 'number',
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

  @OneToMany(() => UserEntity, (user) => user.transfers)
  user: UserEntity;
}
