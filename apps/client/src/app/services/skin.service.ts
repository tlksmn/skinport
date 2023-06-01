import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {GetItemsDataT, TransferAmountType, TransferDto} from "@skinport/dto";

@Injectable()
export class SkinService {
  constructor(private readonly apiService: ApiService) { }

  getListOfSkins(data: GetItemsDataT){
    return this.apiService.get('list', data);
  }

  transferAmount(data: TransferAmountType){
    return this.apiService.post<TransferDto, TransferAmountType>('buy', data);
  }
}
