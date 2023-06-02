import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SkinComponent} from "./skin.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  providers:[],
  exports: [SkinComponent],
  declarations: [SkinComponent],
})
export class SkinModule{}
