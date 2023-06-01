import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {GetDataSkinportDto, TransferDto} from "@skinport/dto-types";

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

  @Post('buy')
  async transfer(@Body() data: TransferDto){
    await this.appService.transferAmount(data);
  }
}
