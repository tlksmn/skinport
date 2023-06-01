import {Component, OnInit} from '@angular/core';
import {SkinService} from "../services/skin.service";
import {CurrencyList} from "@skinport/dto";

@Component({
  selector: 'skinport-skin',
  templateUrl: './skin.component.html',
  styleUrls: ['./skin.component.scss'],
})
export class SkinComponent implements OnInit {
  async ngOnInit() {
    this.skinService.getListOfSkins({
      app_id: 730,
      tradable: false,
      currency: CurrencyList.EUR
    }).subscribe(console.log)
  }

  constructor(private readonly skinService: SkinService) {
  }
}
