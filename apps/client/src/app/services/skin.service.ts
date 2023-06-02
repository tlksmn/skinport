import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {DataSkinportDtoDec, GetItemsDataT, ResponseTransferType, TransferAmountType} from "@skinport/dto";
import {ReplaySubject, tap} from "rxjs";

@Injectable()
export class SkinService {
  public skinsArray: ReplaySubject<DataSkinportDtoDec[]> = new ReplaySubject<DataSkinportDtoDec[]>(1);
  public skinFetchComplete: ReplaySubject<number> = new ReplaySubject<number>(0)

  constructor(private readonly apiService: ApiService) {
  }

  getListOfSkins(data: GetItemsDataT) {
    return this.apiService.get<DataSkinportDtoDec[]>('list', data)
      .pipe(
        tap((value) => this.skinsArray.next(value)),
      );
  }

  transferAmount(data: TransferAmountType) {
    return this.apiService.post<ResponseTransferType, TransferAmountType>('buy', data)
      .pipe(
        tap(() => this.skinFetchComplete.next(Math.random()*1000))
      );
  }
}
