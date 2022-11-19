import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ICurrencyConvertedPair} from "../../models/currency-converted-pair.interface";

@Component({
  selector: 'app-popular-currency-item',
  templateUrl: './popular-currency-item.component.html',
  styleUrls: ['./popular-currency-item.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PopularCurrencyItemComponent implements OnInit {

  @Input() convertedCurrencyPair: ICurrencyConvertedPair | undefined;
  constructor() {
  }

  ngOnInit(): void {
  }

}
