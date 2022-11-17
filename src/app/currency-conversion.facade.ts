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
    this.conversionApi.convertFromCurrencyToAnother(amount, fromCurrencyCode, toCurrencyCode)
      .subscribe(
        (convertedCurrency) => this.updateConvertedFromCurrencyState(convertedCurrency),
        (error) => console.error(error),
      );
  }

  //map and store the converted fromCurrency to are
  updateConvertedFromCurrencyState(response: IConversionCurrencyResponse) {
    //convert the api response to format to be store in the state
    const mappedResponse = this.currencyConversionMapper.convertApiResponseToConvertedPair(response);
    //stop converting base currency the loader at this point
    this.currencyConversionState.setBaseCurrencyConverting(false);
    //update the converted base currency state value
    this.currencyConversionState.setConvertedBaseCurrencyValue(mappedResponse);
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
      this.conversionApi.convertFromCurrencyToAnother(amount, fromCountry, otherCurrency)
        .subscribe(
          (convertedValue) => {
            //map the convertedValue to a DTO object
            const mappedResponse = this.currencyConversionMapper.convertApiResponseToConvertedPair(convertedValue);
            convertedPopularCurrenciesResponse.push(mappedResponse);
          }
        )
    });
    //stop the loading indicator
    this.currencyConversionState.setPopularCurrenciesConverting(false);
    //update the other popular converted currencies state with the converted values
    this.currencyConversionState.setConvertedPopularCurrencyValues(convertedPopularCurrenciesResponse);
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
