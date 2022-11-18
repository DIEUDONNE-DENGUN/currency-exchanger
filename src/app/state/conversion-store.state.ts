import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ICurrencyConvertedPair} from "../models/currency-converted-pair.interface";

@Injectable({providedIn: 'root'})

export class CurrencyConversionStore {

  private baseCurrencyConverting$ = new BehaviorSubject<boolean>(false);
  private popularCurrencyConverting$ = new BehaviorSubject<boolean>(false);
  // @ts-ignore
  private convertedBaseCurrencyValue$ = new BehaviorSubject<ICurrencyConvertedPair>(null);
  // @ts-ignore
  private convertedPopularCurrencyValues$ = new BehaviorSubject<ICurrencyConvertedPair[]>(null);

  isBaseCurrencyConverting$() {
    return this.baseCurrencyConverting$.asObservable();
  }

  isPopularCurrenciesConverting$() {
    return this.popularCurrencyConverting$.asObservable();
  }

  setBaseCurrencyConverting(isConverting: boolean) {
    this.baseCurrencyConverting$.next(isConverting);
  }

  setPopularCurrenciesConverting(isConverting: boolean) {
    this.popularCurrencyConverting$.next(isConverting);
  }

  setConvertedPopularCurrencyValues(convertedPopularCurrencies: ICurrencyConvertedPair[]) {
    return this.convertedPopularCurrencyValues$.next(convertedPopularCurrencies);
  }

  setConvertedBaseCurrencyValue(currencyConvertedPair: ICurrencyConvertedPair) {
    this.convertedBaseCurrencyValue$.next(currencyConvertedPair);
  }

  getConvertedBaseCurrencyValue$() {
    return this.convertedBaseCurrencyValue$.asObservable();
  }

  getConvertedPopularCurrencyValues$() {
    return this.convertedPopularCurrencyValues$.asObservable();
  }
}
