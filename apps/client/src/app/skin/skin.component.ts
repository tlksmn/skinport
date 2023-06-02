import {Component, OnDestroy, OnInit} from '@angular/core';
import {SkinService} from "../services/skin.service";
import {CurrencyList, DataSkinportDtoDec, TransferTypeEnum, UserDto} from "@skinport/dto";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, NEVER, of, Subscription, tap, throwError} from "rxjs";
import {UserService} from "../services/user.service";

@Component({
  selector: 'skinport-skin',
  templateUrl: './skin.component.html',
  styleUrls: ['./skin.component.scss'],
})
export class SkinComponent implements OnInit, OnDestroy {
  public filterControlForm: FormGroup<FilterControlFromT>;
  public currencyList = Object.keys(CurrencyList);
  public currentPage: number = 1;
  public allPage: number = 1;
  public everyPageCount: number = 30;
  private subscriptions: Subscription[] = [];
  private userSelected!: UserDto;

  constructor(
    public readonly skinService: SkinService,
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService
  ) {
    this.filterControlForm = formBuilder.group<FilterControlFromT>({
      tradable: new FormControl(true, [Validators.required]),
      app_id: new FormControl(730, [Validators.required, Validators.min(1)]),
      currency: new FormControl(CurrencyList.USD, [Validators.required])
    })
  }

  async ngOnInit() {
    this.filterFormSubmit();
    const subscription = this.userService.userSelected.pipe(
      tap(value => {
        this.userSelected = value;
      })
    ).subscribe();
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((e) => {
      e.unsubscribe()
    })
    this.subscriptions = [];
  }

  filterFormSubmit() {
    const subscription = this.skinService.getListOfSkins({
      app_id: this.appIdCtrl.value!,
      currency: this.currencyCtrl.value!,
      tradable: this.tradableCtrl.value!
    }).subscribe({
      next: (value) => {
        this.allPage = Math.ceil(value.length / this.everyPageCount);
        this.currentPage = 1;
      }
    })

    this.subscriptions.push(subscription);
  }

  nextPage() {
    if (this.currentPage < this.allPage) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  async transfer(buy: boolean, item: DataSkinportDtoDec,) {
    if (this.userSelected) {
      await this.skinService.transferAmount({
        amount: Math.ceil(buy ? item.suggested_price : item.mean_price),
        action: buy ? TransferTypeEnum.BUY : TransferTypeEnum.SELL,
        user_id: this.userSelected.id,
        ts: ''
      }).pipe(
        catchError((err) => {
          alert(err.error.message)
          return NEVER
        })
      ).toPromise()
    } else {
      alert('please select user')
    }
  }

  get currencyCtrl() {
    return this.filterControlForm.get('currency')!;
  }

  get appIdCtrl() {
    return this.filterControlForm.get('app_id')!
  }

  get tradableCtrl() {
    return this.filterControlForm.get('tradable')!
  }
}

type FilterControlFromT = {
  tradable: FormControl<boolean | null>,
  app_id: FormControl<number | null>,
  currency: FormControl<CurrencyList | null>
}
