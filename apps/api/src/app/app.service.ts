import {Injectable} from '@nestjs/common';
import {GetDataSkinportDto} from "@skinport/dto-types";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import axios from "axios";

import {ApiService} from "../api/api.service";
import {TransferEntity} from "../db/entities/transfer.entity";
import {UserEntity} from "../db/entities/user.entity";


@Injectable()
export class AppService {
  constructor(
    private readonly apiService: ApiService,
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
    const response = await axios.request(headers);
  }

  async buy(){

  }

}
