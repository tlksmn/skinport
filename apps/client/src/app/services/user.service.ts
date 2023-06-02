import {Injectable} from '@angular/core';
import {CreateUserType, UserDto} from "@skinport/dto";
import {BehaviorSubject, lastValueFrom, ReplaySubject, tap} from "rxjs";

import {ApiService} from "./api.service";

@Injectable()
export class UserService {
  users: ReplaySubject<UserDto[]> = new ReplaySubject<UserDto[]>(1);
  userSelected: BehaviorSubject<UserDto> = new BehaviorSubject<UserDto>(null as unknown as UserDto);

  constructor(private readonly apiService: ApiService) {
  }

  list() {
    return this.apiService.get<UserDto[]>('users', {})
      .pipe(
        tap(async (response) => {
          this.users.next(response);
          const user = this.userSelected.getValue()
          if(user){
            const userNew = response.filter((e) => e.id === user?.id)[0];
            if (userNew) {
              this.userSelected.next(userNew);
            }
          }
        })
      )
  }

  createUser(data: CreateUserType) {
    return this.apiService.post<UserDto, CreateUserType>('create-user', data)
  }
}
