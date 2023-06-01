import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import axios from "axios";
import {Cache} from "cache-manager";
import {Inject} from "@angular/core";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {
  DataSkinportDto,
  GetDataSkinportDto,
  GetItemsDataT,
  TransferDto,
  TransferResultTypeEnum,
  TransferTypeEnum
} from "@skinport/dto-types";


import {ApiService} from "../api/api.service";
import {TransferEntity} from "../db/entities/transfer.entity";
import {UserEntity} from "../db/entities/user.entity";


@Injectable()
export class AppService {
  constructor(
    private readonly apiService: ApiService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectRepository(TransferEntity) private readonly transferRepository: Repository<TransferEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {
  }

  getData(): { message: string } {
    return {message: 'Hello API'};
  }

  async getFromSkinPortApi(data: GetDataSkinportDto) {
    //--todo
    // should get in first from cache
    // if not find do fetch from service
    //--todo
    const headers = this.apiService.getItems(
      {
        app_id: data.app_id,
        currency: data.currency,
        tradable: data.tradable
      })

    const response = await axios.request<any, DataSkinportDto, GetItemsDataT>(headers);
    //-todo
    // save response to cache
    //--todo
    return response;
  }

  async transferAmount(data: TransferDto) {
    const user = await this.userRepository.findOne({where: {id: data.user_id}});
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    switch (data.action) {
      case TransferTypeEnum.SELL:
        user.balance = user.balance + data.amount;
        break;
      case TransferTypeEnum.BUY:
        if (user.balance > 0 && user.balance > data.amount) {
          user.balance = user.balance - data.amount;
        } else {
          return new HttpException(TransferResultTypeEnum.FAIL, HttpStatus.BAD_REQUEST);
        }
        break;
    }
    await this.userRepository.save(user);
    return new HttpException(TransferResultTypeEnum.SUCCESS, HttpStatus.OK);
  }
}
