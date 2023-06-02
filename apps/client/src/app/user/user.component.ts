import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription, tap} from "rxjs";
import {UserDto} from "@skinport/dto";

import {UserService} from "../services/user.service";
import {SkinService} from "../services/skin.service";

@Component({
  selector: 'skinport-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public addNewUserForm: FormGroup<UserFormType>;

  constructor(
    public readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly skinService: SkinService
  ) {
    this.addNewUserForm = this.formBuilder.group<UserFormType>({
      balance: new FormControl(1000, [Validators.required, Validators.min(1)]),
    })
  }

  ngOnInit(): void {
    const subscription = this.skinService.skinFetchComplete
      .pipe(
        tap((value)=> console.log(value)),
        tap(()=> this.getUsers())
      ).subscribe();
    this.subscriptions.push(subscription)
  }

  getUsers() {
    const subscription = this.userService.list().subscribe();
    this.subscriptions.push(subscription);
  }

  selectUser(data: UserDto) {
    this.userService.userSelected.next(data);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((e) => {
      e.unsubscribe();
    })
    this.subscriptions = [];
  }

  get balance() {
    return this.addNewUserForm.get('balance')!;
  }

  addNewUserSubmit() {
    const subscription = this.userService.createUser(this.addNewUserForm.value)
      .pipe(
        tap(() => {
            this.getUsers();
          }
        )
      ).subscribe();
    this.subscriptions.push(subscription);
  }

}

type UserFormType = {
  balance: FormControl<number | null>
}
