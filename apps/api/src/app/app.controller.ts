import {Controller, Get, Query} from '@nestjs/common';
import {GetDataSkinportDto} from "@skinport/dto-types";

import { AppService } from './app.service';
import {ApiService} from "../api/api.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  foo() {
    return this.appService.getData();
  }

  @Get('getData')
  getData(@Query() data: GetDataSkinportDto){
    return this.appService.getFromSkinPortApi(data)
  }
}
