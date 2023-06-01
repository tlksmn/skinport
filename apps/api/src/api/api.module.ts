import {Module} from "@nestjs/common";
import {ApiService} from "./api.service";
import {ConfigModule} from "@nestjs/config";

@Module({
  providers: [ApiService],
  exports: [ApiService],
  imports: [ConfigModule]
})
export class ApiModule {
}
