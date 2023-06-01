import {NgModule} from "@angular/core";
import {SkinService} from "./skin.service";
import {UserService} from "./user.service";

@NgModule({
  providers: [SkinService, UserService]
})
export class ServicesModule{}
