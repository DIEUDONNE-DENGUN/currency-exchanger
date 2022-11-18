import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {IConversionCurrencyResponse} from "../models/conversion-currency.interface";


@Injectable({providedIn: 'root'})

/**
 * manage caching of already convert currency pair for fast retrieval
 */
export class CacheCurrencyConversionService {
  private currencyConversionPairCache = {};

  /**
   * check if currency pair conversion exist in the cache already
   */
  hasConversionPairInCache(fromCurrency: string, toCurrency: string): boolean {
    const currencyPairAsKey = fromCurrency + "_" + toCurrency;
    return currencyPairAsKey in this.currencyConversionPairCache;
  }

  getConversionCurrencyPairFromCache(fromCurrency: string, toCurrency: string, amount: number): Observable<IConversionCurrencyResponse> {
    const currencyPairAsKey = fromCurrency + "_" + toCurrency;
    // @ts-ignore
    return (currencyPairAsKey in this.currencyConversionPairCache) ? this.currencyConversionPairCache[currencyPairAsKey] : null;
  }

  setConversionCurrencyPairToCache(response: IConversionCurrencyResponse, fromCurrency: string, toCurrency: string) {
    const currencyPairAsKey = fromCurrency + "_" + toCurrency;
    console.log(of(response));
    // @ts-ignore
    this.currencyConversionPairCache[currencyPairAsKey] = of(response);
  }
}
