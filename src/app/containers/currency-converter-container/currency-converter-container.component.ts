import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CurrencyConversionFacade} from "../../currency-conversion.facade";
import {ICurrency} from "../../models/currency.interface";
import {Observable} from "rxjs";
import {ICurrencyConvertedPair} from "../../models/currency-converted-pair.interface";


@Component({
  selector: 'app-currency-converter-container',
  templateUrl: './currency-converter-container.component.html',
  styleUrls: ['./currency-converter-container.component.scss']
})
export class CurrencyConverterContainerComponent implements OnInit {

  @Output() isAmountValid = new EventEmitter<boolean>(false);
  currencyList: Observable<ICurrency[]> | undefined;
  isConvertingFromCurrencyLoading: boolean | undefined;
  isConvertingPopularCurrenciesLoading: boolean | undefined;
  convertedBaseCurrencyValue: ICurrencyConvertedPair | undefined;
  convertedOtherPopularCurrenciesValues: ICurrencyConvertedPair[] | undefined;
  loadingConvertingMessage: string = "Converting currency pair using api exchange";
  loadingPopularCurrenciesConvertingMessage: string = "Converting to other popular currencies for entered amount";

  constructor(private readonly currencyConversionFacade: CurrencyConversionFacade) {
  }

  ngOnInit(): void {
    this.currencyList = this.currencyConversionFacade.getCurrencies();
    //handle all observable value changed from the facade service
    this.listenConvertingCurrencyChanged();
    this.listConvertedBaseCurrencyValue();
    this.listenConvertingOtherPopularCurrenciesValueChanged();
    this.listConvertedOtherPopularCurrenciesValue();
  }

  listenConvertingCurrencyChanged() {
    this.currencyConversionFacade.isBaseCurrencyConverting().subscribe((state) => {
      this.isConvertingFromCurrencyLoading = state;
    });
  }

  listConvertedBaseCurrencyValue() {
    this.currencyConversionFacade.getConvertedFromCurrency().subscribe((convertCurrency) => {
      if (convertCurrency) {
        //send the converted value to the currency summary component
        this.convertedBaseCurrencyValue = this.formatConvertedCurrency(convertCurrency);
      }
    });
  }

  listenConvertingOtherPopularCurrenciesValueChanged() {
    this.currencyConversionFacade.isPopularCurrenciesConverting().subscribe((state) => {
      this.isConvertingPopularCurrenciesLoading = state;
      console.log("converting popular data status:");
      console.log(state);
    });
  }

  /**
   * Listen to observable value changed for the converted api popular currencies for the entered amount and fromCurrency
   */
  listConvertedOtherPopularCurrenciesValue() {
    this.currencyConversionFacade.getConvertedPopularCurrencies().subscribe((convertedCurrencies) => {
      if (convertedCurrencies) {
        //for all the currencies results, format to 2 decimal places\
        let convertedOtherCurrencies: ICurrencyConvertedPair[] = [];
        convertedCurrencies.forEach(currency => {
          convertedOtherCurrencies.push(this.formatConvertedCurrency(currency));
        });
        console.log(convertedOtherCurrencies);
        this.convertedOtherPopularCurrenciesValues = convertedOtherCurrencies;
      }
    });
  }

  formatConvertedCurrency(currencyResponse: ICurrencyConvertedPair): ICurrencyConvertedPair {
    const formatRate = currencyResponse.rate.toFixed(2)
    const formatConvertedValue = currencyResponse.result.toFixed(2);
    currencyResponse.result = Number(formatConvertedValue);
    currencyResponse.rate = Number(formatRate);
    return currencyResponse;
  }

  handleEnteredAmountEvent($event: boolean) {
    // the event to the home container component
    this.isAmountValid.emit($event);
  }

  convertCurrencyAmount($event: any) {
    this.currencyConversionFacade.convertFromCurrencyToCurrency($event.amount, $event.fromCurrency, $event.toCurrency)
  }

  loadCurrencyPairDetail($event: boolean) {
    // if($event)
  }
}
