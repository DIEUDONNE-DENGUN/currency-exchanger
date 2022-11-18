import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICurrencyConvertedPair} from "../../models/currency-converted-pair.interface";

@Component({
  selector: 'app-currency-conversion-summary',
  templateUrl: './currency-conversion-summary.component.html',
  styleUrls: ['./currency-conversion-summary.component.scss']
})
export class CurrencyConversionSummaryComponent implements OnInit {

  @Input() convertedCurrencyPair: ICurrencyConvertedPair | undefined;
  @Input() isDetailsPage: boolean | undefined;
  @Output() viewConvertedCurrentPairDetailEvent= new EventEmitter<boolean>(false);

  constructor() {
  }

  ngOnInit(): void {
  }

  //show the converted currency detail by emitting event
  showConvertedCurrencyDetail() {
      //send the clicked event to parent component
    this.viewConvertedCurrentPairDetailEvent?.emit(true);
  }
}
