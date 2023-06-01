import {NgModule} from "@angular/core";
import {SkinService} from "./skin.service";
import {UserService} from "./user.service";
import {ApiService} from "./api.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  providers: [SkinService, UserService, ApiService],
  imports: [HttpClientModule]
})
export class ServicesModule{}
