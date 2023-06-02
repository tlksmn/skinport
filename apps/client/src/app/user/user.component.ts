import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription, switchMap, tap} from "rxjs";

import {UserService} from "../services/user.service";

@Component({
  selector: 'skinport-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = []
  public addNewUserForm: FormGroup<UserFormType>;

  constructor(
    public readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
  ) {
    this.addNewUserForm = this.formBuilder.group<UserFormType>({
      balance: new FormControl(1000, [Validators.required, Validators.min(1)]),
    })
  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    const subscription = this.userService.list().subscribe();
    this.subscriptions.push(subscription);
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
