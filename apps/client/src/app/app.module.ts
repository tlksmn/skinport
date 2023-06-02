import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ServicesModule} from "./services/services.module";
import {SkinModule} from "./skin/skin.module";
import {UserModule} from "./user/user.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ServicesModule,
    SkinModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
