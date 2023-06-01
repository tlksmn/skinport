import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {SkinComponent} from "./skin/skin.component";
import {UserComponent} from "./user/user.component";
import {ServicesModule} from "./services/services.module";

@NgModule({
  declarations: [AppComponent, SkinComponent, UserComponent],
  imports: [
    BrowserModule,
    ServicesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
