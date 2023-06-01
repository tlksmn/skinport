import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ApiModule} from '../api/api.module';
import {DbModule} from "../db/db.module";
import {TransferEntity} from "../db/entities/transfer.entity";
import {UserEntity} from "../db/entities/user.entity";
import {CacheModule} from "@nestjs/cache-manager";

@Module({
  imports: [
    ApiModule,
    DbModule,
    TypeOrmModule.forFeature([TransferEntity, UserEntity]),
    CacheModule.register({ttl: 10 * 60 * 60 * 1000})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
