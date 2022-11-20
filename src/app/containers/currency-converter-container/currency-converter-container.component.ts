import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {CurrencyConversionFacade} from "../../currency-conversion.facade";
import {ICurrency} from "../../models/currency.interface";
import {Observable, Subscription} from "rxjs";
import {ICurrencyConvertedPair} from "../../models/currency-converted-pair.interface";


@Component({
  selector: 'app-currency-converter-container',
  templateUrl: './currency-converter-container.component.html',
  styleUrls: ['./currency-converter-container.component.scss']
})
export class CurrencyConverterContainerComponent implements OnInit, OnDestroy {

  @Output() isAmountValid = new EventEmitter<boolean>(false);
  @Input() convertCurrentPairHeader: {} | undefined;
  currencyList: Observable<ICurrency[]> | undefined;
  isConvertingFromCurrencyLoading: boolean | undefined;
  isConvertingPopularCurrenciesLoading: boolean | undefined;
  convertedBaseCurrencyValue: ICurrencyConvertedPair | undefined;
  convertedOtherPopularCurrenciesValues: ICurrencyConvertedPair[] | undefined;
  loadingConvertingMessage: string = "Converting currency pair using api exchange";
  loadingPopularCurrenciesConvertingMessage: string = "Converting to other popular currencies for entered amount";
  toolBarTitle: string = "Currency Exchanger";
  isDetailPageComponent: boolean = false;
  currencyAmountEntered: number | undefined;
  subscriptions: Subscription[] | undefined;

  constructor(private readonly currencyConversionFacade: CurrencyConversionFacade) {
  }

  ngOnChanges(changes: SimpleChanges) {
    //handle change event for the clicked converison from header
    const currencyPair = changes['convertCurrentPairHeader'];
    if (currencyPair && currencyPair.currentValue) {
      if (this.currencyAmountEntered) {
        let currencyPairValue = currencyPair.currentValue;
        currencyPairValue.amount = this.currencyAmountEntered;
        //call the conversion service to handle the rest
        this.convertCurrencyAmount(currencyPairValue);
        //after converting , open the detail page
        this.loadCurrencyPairDetail(true);
        // this.isDetailPageComponent = true;
      }
    }
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
    const currencyBaseConvertingSubscription = this.currencyConversionFacade.isBaseCurrencyConverting().subscribe((state) => {
      this.isConvertingFromCurrencyLoading = state;
    });
    this.subscriptions = this.subscriptions?.concat(currencyBaseConvertingSubscription);
  }

  listConvertedBaseCurrencyValue() {
    const convertedBaseCurrencyValueSubscription = this.currencyConversionFacade.getConvertedFromCurrency().subscribe((convertCurrency) => {
      if (convertCurrency) {
        //send the converted value to the currency summary component
        this.convertedBaseCurrencyValue = this.formatConvertedCurrency(convertCurrency);
      }
    });
    this.subscriptions = this.subscriptions?.concat(convertedBaseCurrencyValueSubscription);
  }

  listenConvertingOtherPopularCurrenciesValueChanged() {
    const convertingOtherPopularCurrenciesValueChangedSubscription = this.currencyConversionFacade.isPopularCurrenciesConverting().subscribe((state) => {
      this.isConvertingPopularCurrenciesLoading = state;
    });
    this.subscriptions = this.subscriptions?.concat(convertingOtherPopularCurrenciesValueChangedSubscription);
  }

  /**
   * Listen to observable value changed for the converted api popular currencies for the entered amount and fromCurrency
   */
  listConvertedOtherPopularCurrenciesValue() {
    const convertedOtherPopularCurrenciesValueSubscription = this.currencyConversionFacade.getConvertedPopularCurrencies().subscribe((convertedCurrencies) => {
      if (convertedCurrencies) {
        //for all the currencies results, format to 2 decimal places\
        let convertedOtherCurrencies: ICurrencyConvertedPair[] = [];
        convertedCurrencies.forEach(currency => {
          convertedOtherCurrencies.push(this.formatConvertedCurrency(currency));
        });
        this.convertedOtherPopularCurrenciesValues = convertedOtherCurrencies;
      }
    });
    this.subscriptions = this.subscriptions?.concat(convertedOtherPopularCurrenciesValueSubscription);
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
    this.currencyAmountEntered = $event.amount;
    this.currencyConversionFacade.convertFromCurrencyToCurrency($event.amount, $event.fromCurrency, $event.toCurrency)
  }

  loadCurrencyPairDetail($event: boolean) {
    if ($event) {
      //set the tool bar title to reflect the current fromCurrency
      const fromCurrency = this.convertedBaseCurrencyValue?.fromCurrency;
      //get its full name from the loaded currencies
      this.currencyList?.subscribe((currencies) => {
        const selectedFromCurrencyName = currencies.filter((currency) => currency.code == fromCurrency)[0].name;
        this.toolBarTitle = fromCurrency + " - " + selectedFromCurrencyName;
        this.isDetailPageComponent = true;
      });
    }
  }

  handleReturnToHomeEvent($event: boolean) {
    if ($event) {
      //activate component elements that were disabled when loading detail view
      this.isDetailPageComponent = false;
      this.toolBarTitle = "Currency Exchanger";
    }
  }

  //unsubscribe all subscriptions
  ngOnDestroy(): void {
    this.subscriptions?.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
