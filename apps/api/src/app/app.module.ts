import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ApiModule} from '../api/api.module';
import {DbModule} from "../db/db.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TransferEntity} from "../db/entities/transfer.entity";
import {UserEntity} from "../db/entities/user.entity";

@Module({
  imports: [ApiModule, ConfigModule, DbModule, TypeOrmModule.forFeature([TransferEntity, UserEntity])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
