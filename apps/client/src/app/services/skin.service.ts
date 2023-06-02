import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {DataSkinportDtoDec, GetItemsDataT, TransferAmountType, TransferDto} from "@skinport/dto";
import {ReplaySubject, tap} from "rxjs";

@Injectable()
export class SkinService {
  public skinsArray: ReplaySubject<DataSkinportDtoDec[]> = new ReplaySubject<DataSkinportDtoDec[]>(1);
  constructor(private readonly apiService: ApiService) {}

  getListOfSkins(data: GetItemsDataT) {
    return this.apiService.get<DataSkinportDtoDec[]>('list', data)
      .pipe(
        tap((value) => this.skinsArray.next(value))
      );
  }

  transferAmount(data: TransferAmountType) {
    return this.apiService.post<TransferDto, TransferAmountType>('buy', data);
  }
}
