import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {TransferDtoT} from "@skinport/dto-types";
import {CreateUserType, ResponseTransferType, UserDto} from "@skinport/dto";

@Injectable()
export class UserService {
  constructor(private readonly apiService: ApiService) {}

  buy(data: TransferDtoT) {
    return this.apiService.post<ResponseTransferType, TransferDtoT>('buy', data)
  }

  list(){
    return this.apiService.get<UserDto[]>('users', {})
  }

  createUser(data: CreateUserType){
    return this.apiService.post<UserDto, CreateUserType>('create-user', data)
  }
}
