import {Body, Controller, Get, Logger, Post, Query} from '@nestjs/common';
import {GetDataSkinportDto, TransferDto} from "@skinport/dto-types";

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getData')
  getData(@Query() data: GetDataSkinportDto){
    return this.appService.getFromSkinPortApi(data)
  }

  @Post('buy')
  async transfer(@Body() data: TransferDto){
    console.log(data);
    await this.appService.transferAmountWithTransaction(data);
  }
}
