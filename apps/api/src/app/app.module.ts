import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ApiModule} from '../api/api.module';
import {DbModule} from "../db/db.module";
import {TransferEntity} from "../db/entities/transfer.entity";
import {UserEntity} from "../db/entities/user.entity";

@Module({
  imports: [
    ApiModule,
    DbModule,
    TypeOrmModule.forFeature([TransferEntity, UserEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
