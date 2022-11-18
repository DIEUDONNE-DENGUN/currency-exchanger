import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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

  convertFromCurrencyToAnother(amount: number, fromCurrencyCode: string, toCurrencyCode: string): Observable<IConversionCurrencyResponse> {
    //check if currency pair has already converted value in cache
    if (this.cacheService.hasConversionPairInCache(fromCurrencyCode, toCurrencyCode)) return this.cacheService.getConversionCurrencyPairFromCache(fromCurrencyCode, toCurrencyCode);
    //if doesn't exist in cache, get from the api exchange service directly and set the cache with this new value
    const conversionEndpoint = `${this.apiHostUrl}/${this.routes.conversionApiUrl}`;
    const requestParams = this.buildRequestParams(fromCurrencyCode, toCurrencyCode, amount);
    return this.httpClient.get<IConversionCurrencyResponse>(conversionEndpoint, {params: requestParams})
      .pipe(tap(convertedValue => this.cacheService.setConversionCurrencyPairToCache(convertedValue, fromCurrencyCode, toCurrencyCode)));
  }

  buildRequestParams(fromCurrencyCode: string, toCurrencyCode: string, amount: number) {
    let requestParams = new HttpParams();
    requestParams.append('access_key', this.apiClientKey);
    requestParams.append('from', fromCurrencyCode);
    requestParams.append('to', toCurrencyCode);
    requestParams.append('amount', amount);
    return requestParams;
  }
}
