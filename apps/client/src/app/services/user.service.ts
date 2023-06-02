import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {TransferDtoT} from "@skinport/dto-types";
import {CreateUserType, ResponseTransferType, UserDto} from "@skinport/dto";
import {ReplaySubject, tap} from "rxjs";

@Injectable()
export class UserService {
  users: ReplaySubject<UserDto[]> = new ReplaySubject<UserDto[]>(1);

  constructor(private readonly apiService: ApiService) {}

  buy(data: TransferDtoT) {
    return this.apiService.post<ResponseTransferType, TransferDtoT>('buy', data)
  }

  list() {
    return this.apiService.get<UserDto[]>('users', {})
      .pipe(tap((response) => this.users.next(response)))
  }

  createUser(data: CreateUserType) {
    return this.apiService.post<UserDto, CreateUserType>('create-user', data)
  }
}
