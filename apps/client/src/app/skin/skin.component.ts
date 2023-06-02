import {Component, OnDestroy, OnInit} from '@angular/core';
import {SkinService} from "../services/skin.service";
import {CurrencyList} from "@skinport/dto";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

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

  constructor(public readonly skinService: SkinService, private readonly formBuilder: FormBuilder) {
    this.filterControlForm = formBuilder.group<FilterControlFromT>({
      tradable: new FormControl(true, [Validators.required]),
      app_id: new FormControl(730, [Validators.required, Validators.min(1)]),
      currency: new FormControl(CurrencyList.USD, [Validators.required])
    })
  }

  async ngOnInit() {
    this.filterFormSubmit();
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
        this.allPage = Math.ceil(value.length/this.everyPageCount);
        this.currentPage = 1;
      }
    })

    this.subscriptions.push(subscription);
  }

  nextPage(){
    if(this.currentPage < this.allPage){
      this.currentPage++;
    }
  }
  prevPage(){
    if(this.currentPage > 1){
      this.currentPage--;
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
