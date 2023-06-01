import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UserEntity} from "./entities/user.entity";
import {TransferEntity} from "./entities/transfer.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'envs/.dev.env'
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        port: configService.get('POSTGRES_PORT'),
        host: configService.get('POSTGRES_HOST'),
        database: configService.get('POSTGRES_DATABASE'),
        username: configService.get('POSTGRES_USERNAME'),
        password: configService.get('POSTGRES_PASSWORD'),
        entities: [UserEntity, TransferEntity],
        synchronize: true,
        // dropSchema: true
      })
    })]
})
export class DbModule {

}
