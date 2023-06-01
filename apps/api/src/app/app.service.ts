import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import axios from "axios";
import {Cache} from "cache-manager";
import {Inject} from "@angular/core";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {DataSkinportDto} from "@skinport/dto-types";
import {GetDataSkinportDto, GetItemsDataT} from "@skinport/dto-types";

import {ApiService} from "../api/api.service";
import {TransferEntity} from "../db/entities/transfer.entity";
import {UserEntity} from "../db/entities/user.entity";


@Injectable()
export class AppService {
  constructor(
    private readonly apiService: ApiService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectRepository(TransferEntity) transferRepository: Repository<TransferEntity>,
    @InjectRepository(UserEntity) userRepository: Repository<UserEntity>
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
    const headers = this.apiService.getItems({app_id: data.app_id, currency: data.currency, tradable: data.tradable})
    const response = await axios.request<any, DataSkinportDto, GetItemsDataT>(headers);
    //-todo
    // save response to cache
    //--todo
    return response;
  }

  async buy() {

  }
}
