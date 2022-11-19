import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ICurrencyConvertedPair} from "../../models/currency-converted-pair.interface";

@Component({
  selector: 'app-popular-currency-list',
  templateUrl: './popular-currency-list.component.html',
  styleUrls: ['./popular-currency-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PopularCurrencyListComponent implements OnInit {
  @Input() convertedOtherPopularCurrenciesPair: ICurrencyConvertedPair[] | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
