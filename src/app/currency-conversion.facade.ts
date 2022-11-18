import {Injectable} from "@angular/core";
import {CurrencyConversionMapper} from "./mappers/conversion-mapper";
import {ConversionApiService} from "./services/conversion-api.service";
import {CurrencyConversionStore} from "./state/conversion-store.state";
import {ICurrency} from "./models/currency.interface";
import {IConversionCurrencyResponse} from "./models/conversion-currency.interface";
import {ICurrencyConvertedPair} from "./models/currency-converted-pair.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
/**
 * @author: Dieudonne Takougang
 * abstract communication between the data layer and the container services
 */
export class CurrencyConversionFacade {
  constructor(private readonly currencyConversionMapper: CurrencyConversionMapper,
              private readonly conversionApi: ConversionApiService,
              private readonly currencyConversionState: CurrencyConversionStore) {
  }

  /**
   * get popular currencies from local store
   */
  getCurrencies(): Observable<ICurrency[]> {
    return this.conversionApi.getPopularCurrencies();
  }

  /**
   * convert a currency value to another currency equivalent
   */
  convertFromCurrencyToCurrency(amount: number, fromCurrencyCode: string, toCurrencyCode: string) {
    //set the converting state to converting to start the loader
    this.currencyConversionState.setBaseCurrencyConverting(true);
    //convert the entered amount using the api
    // @ts-ignore
    this.conversionApi.convertFromCurrencyToAnother(amount, fromCurrencyCode, toCurrencyCode)
      .subscribe(
        (convertedCurrency) => this.updateConvertedFromCurrencyState(convertedCurrency, amount),
        (error) => console.error(error),
      );
  }

  //map and store the converted fromCurrency to are
  updateConvertedFromCurrencyState(response: IConversionCurrencyResponse, amount: number) {
    //convert the api response to format to be store in the state
    const mappedResponse = this.currencyConversionMapper.convertApiResponseToConvertedPair(response);
    console.log(mappedResponse);
    //stop converting base currency the loader at this point
    this.currencyConversionState.setBaseCurrencyConverting(false);
    //update the converted base currency state value
    this.currencyConversionState.setConvertedBaseCurrencyValue(mappedResponse);
    //run the converison of the entered amount to the 9 other popular currencies
    this.convertFromCurrencyAmountToPopularCurrencies(mappedResponse, amount)
  }

  convertFromCurrencyAmountToPopularCurrencies(convertedBaseCurrencyResponse: ICurrencyConvertedPair, amount: number) {
    //get other popular currencies away from the selected fromCurrency value
    const enteredFromCurrencyValue = convertedBaseCurrencyResponse.fromCurrency;
    let otherPopularCurrencies: string[] = [];
    //filter the entered fromCurrency from the list and map the data to list of currencies code
    this.getCurrencies().subscribe((currencies) => {
      otherPopularCurrencies = currencies.filter((currency) => {
        return currency.code !== enteredFromCurrencyValue
      }).map((currency) => {
        return currency.code
      });
    });
    //run the convert other popular api conversion task
    this.bulkConvertFromCurrencyToPopularCurrencies(amount, enteredFromCurrencyValue, otherPopularCurrencies);
  }

  /**
   * Bulk convert an entered amount in  a given currency(fromCurrency) to equivalents for 9 other popular currencies
   */
  bulkConvertFromCurrencyToPopularCurrencies(amount: number, fromCountry: string, otherCurrencies: string[]) {
    //start the load popular currencies conversion loading indicator
    this.currencyConversionState.setPopularCurrenciesConverting(true);

    let convertedPopularCurrenciesResponse: ICurrencyConvertedPair[] = [];
    //loop through the other currencies and perform a fromCurrency to the other currency
    otherCurrencies.forEach(otherCurrency => {
      //call the exchange currency conversion api
      // @ts-ignore
      this.conversionApi.convertFromCurrencyToAnother(amount, fromCountry, otherCurrency)
        .subscribe(
          (convertedValue) => {
            //map the convertedValue to a DTO object
            const mappedResponse = this.currencyConversionMapper.convertApiResponseToConvertedPair(convertedValue);
            convertedPopularCurrenciesResponse.push(mappedResponse);
            //stop the loading indicator
            this.currencyConversionState.setPopularCurrenciesConverting(false);
            //update the other popular converted currencies state with the converted values
            this.currencyConversionState.setConvertedPopularCurrencyValues(convertedPopularCurrenciesResponse);
          }
        )
    });
  }

  /**
   * get converted values for the converted value to the most popular currencies
   */
  getConvertedPopularCurrencies(): Observable<ICurrencyConvertedPair[]> {
    return this.currencyConversionState.getConvertedPopularCurrencyValues$();
  }

  /**
   * get converted value for a given amount of a current
   */
  getConvertedFromCurrency(): Observable<ICurrencyConvertedPair> {
    return this.currencyConversionState.getConvertedBaseCurrencyValue$();
  }

  /**
   * check if currency converter is running by means of an observable
   */
  isBaseCurrencyConverting(): Observable<boolean> {
    return this.currencyConversionState.isBaseCurrencyConverting$();
  }

  /**
   * check if the popular currencies conversion is running by means of an observable
   */
  isPopularCurrenciesConverting(): Observable<boolean> {
    return this.currencyConversionState.isPopularCurrenciesConverting$();
  }
}
