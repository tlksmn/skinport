import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigService} from "@nestjs/config";
import {TransferEntity} from "./entities/transfer.entity";
import {UserEntity} from "./entities/user.entity";

@Module({
  imports: [TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService)=> ({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: configService.get('DB_USER_NAME'),
      password: configService.get('DB_USER_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [TransferEntity, UserEntity],
      synchronize: true,
    })
  })]
})
export class DbModule {

}
