import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-currency-converter-container',
  templateUrl: './currency-converter-container.component.html',
  styleUrls: ['./currency-converter-container.component.scss']
})
export class CurrencyConverterContainerComponent implements OnInit {

  @Output() isAmountValid = new EventEmitter<boolean>(false);

  constructor() {
  }

  ngOnInit(): void {
  }

  handleEnteredAmountEvent($event: boolean) {
    // the event to the home container component
    this.isAmountValid.emit($event);
  }
}
