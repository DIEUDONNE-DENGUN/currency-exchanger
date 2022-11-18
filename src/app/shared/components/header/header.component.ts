import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isCurrencyAmountEntered: boolean | undefined;
  @Output() convertCurrencyPairHeaderEvent = new EventEmitter<{}>();

  constructor() {
  }

  ngOnInit(): void {
  }

  //send the click event to the parent component to do the conversion
  convertCurrencyPair(fromCurrency: string, toCurrency: string) {
    this.convertCurrencyPairHeaderEvent.emit({fromCurrency: fromCurrency, toCurrency: toCurrency});
  }
}
