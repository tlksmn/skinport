import {Body, Controller, Get, Logger, Post, Query} from '@nestjs/common';
import {GetDataSkinportDto, TransferDto, UserDto} from "@skinport/dto-types";

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('list')
  getData(@Query() data: GetDataSkinportDto){
    return this.appService.getFromSkinPortApi(data)
  }

  @Post('buy')
  async transfer(@Body() data: TransferDto){
    await this.appService.transferAmountWithTransaction(data);
  }

  @Get('users')
  async getListOfUsers(){
    return this.appService.getUsers();
  }

  @Post('create-user')
  async createUser(data: UserDto){
    return this.appService.createUser(data);
  }
}
