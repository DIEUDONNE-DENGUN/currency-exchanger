import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ICurrency} from "../models/currency.interface";
import {currencies} from "../shared/data/currencies.";
import {Observable, of, tap} from "rxjs";
import {IConversionCurrencyResponse} from "../models/conversion-currency.interface";
import {Routes} from "../shared/routes/routes";
import {environment} from "../../environments/environment";
import {CacheCurrencyConversionService} from "../state/cache-currency-conversion.service";

@Injectable({
  providedIn: 'root'
})
export class ConversionApiService {
  private readonly popularCurrencies = currencies;
  private readonly routes = Routes;
  private readonly apiHostUrl = environment.currencyExchangeApiHost
  private readonly apiClientKey = environment.currencyExchangeApiKey;

  constructor(private readonly httpClient: HttpClient,
              private readonly cacheService: CacheCurrencyConversionService) {
  }

  getPopularCurrencies(): Observable<ICurrency[]> {
    return of(this.popularCurrencies);
  }

  convertFromCurrencyToAnother(amount: number, fromCurrencyCode: string, toCurrencyCode: string): Observable<IConversionCurrencyResponse> | null {
    //check if currency pair has already converted value in cache
    if (this.cacheService.hasConversionPairInCache(fromCurrencyCode, toCurrencyCode)) return this.calculateConversionFromCache(fromCurrencyCode, toCurrencyCode, amount);
    //if doesn't exist in cache, get from the api exchange service directly and set the cache with this new value
    const conversionEndpoint = `${this.apiHostUrl}/${this.routes.conversionApiUrl}`;
    const requestParams = this.buildRequestParams(fromCurrencyCode, toCurrencyCode, amount);
    let httpHeaders = new HttpHeaders().set('apiKey', this.apiClientKey);
    return this.httpClient.get<IConversionCurrencyResponse>(conversionEndpoint, {
      headers: httpHeaders,
      params: requestParams
    })
      .pipe(tap(convertedValue => this.cacheService.setConversionCurrencyPairToCache(convertedValue, fromCurrencyCode, toCurrencyCode)));
  }

  calculateConversionFromCache(fromCurrencyCode: string, toCurrencyCode: string, amount: number): Observable<IConversionCurrencyResponse> {
    let responseData = null;
    this.cacheService.getConversionCurrencyPairFromCache(fromCurrencyCode, toCurrencyCode, amount)
      .subscribe(
        (oldData) => {
          oldData.result = (amount * oldData.info.rate);
          responseData = of(oldData);
        });
    // @ts-ignore
    return responseData;

  }

  buildRequestParams(fromCurrencyCode: string, toCurrencyCode: string, amount: number): HttpParams {
    return new HttpParams()
      .set('from', fromCurrencyCode)
      .set('to', toCurrencyCode)
      .set('amount', amount);
  }
}
