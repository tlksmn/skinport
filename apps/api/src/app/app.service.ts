import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import axios, {AxiosError, AxiosResponse} from "axios";
import {Cache} from "cache-manager";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {
  DataSkinportDto,
  GetDataSkinportDto,
  GetItemsDataT,
  TransferDto,
  TransferResultTypeEnum,
  TransferTypeEnum
} from "@skinport/dto-types";
import {Connection} from "typeorm";


import {ApiService} from "../api/api.service";
import {TransferEntity} from "../db/entities/transfer.entity";
import {UserEntity} from "../db/entities/user.entity";


@Injectable()
export class AppService {
  constructor(
    private readonly apiService: ApiService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private connection: Connection,
    @InjectRepository(TransferEntity) private readonly transferRepository: Repository<TransferEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {
  }

  async getFromSkinPortApi(data: GetDataSkinportDto) {
    const cacheInString = `${data.app_id}_${data.currency}_${data.tradable}`;
    const responseFromCache = await this.cacheManager.get<DataSkinportDto[]>(cacheInString);
    if (responseFromCache) {
      return responseFromCache;
    }
    const headers = this.apiService.getItems(
      {
        app_id: data.app_id,
        currency: data.currency,
        tradable: data.tradable,
      });
    try {
      const response = await axios.request<DataSkinportDto[], AxiosResponse<DataSkinportDto[]>, GetItemsDataT>(headers);
      await this.cacheManager.set(cacheInString, response.data);
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new HttpException({
          message: e.message,
          params: e.config.params,
          data: data
        }, e.status)
      }
    }

  }

  // async transferAmount(data: TransferDto) {
  //   const user = await this.userRepository.findOne({where: {id: data.user_id}});
  //   if (!user) {
  //     throw new HttpException('user not found', HttpStatus.NOT_FOUND);
  //   }
  //   switch (data.action) {
  //     case TransferTypeEnum.SELL:
  //       user.balance = user.balance + data.amount;
  //       break;
  //     case TransferTypeEnum.BUY:
  //       if (user.balance > 0 && user.balance > data.amount) {
  //         user.balance = user.balance - data.amount;
  //       } else {
  //         return new HttpException(TransferResultTypeEnum.FAIL, HttpStatus.BAD_REQUEST);
  //       }
  //       break;
  //   }
  //   await this.userRepository.save(user);
  //   return new HttpException(TransferResultTypeEnum.SUCCESS, HttpStatus.OK);
  // }

  async transferAmountWithTransaction(data: TransferDto) {
    const user = await this.userRepository.findOne({where: {id: data.user_id}});
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      switch (data.action) {
        case TransferTypeEnum.SELL:
          user.balance = user.balance + data.amount;
          break;
        case TransferTypeEnum.BUY:
          if (user.balance > 0 && user.balance > data.amount) {
            user.balance = user.balance - data.amount;
          } else {
            throw new HttpException(TransferResultTypeEnum.FAIL, HttpStatus.BAD_REQUEST);
          }
          break;
        default:
          throw new HttpException(TransferResultTypeEnum.FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
          break;
      }
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus())
      }
      throw new HttpException(TransferResultTypeEnum.FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    await queryRunner.release();
    throw new HttpException(TransferResultTypeEnum.SUCCESS, HttpStatus.OK);
  }
}
