import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ICurrency} from "../models/currency.interface";
import {currencies} from "../shared/data/currencies.";
import {Observable, of} from "rxjs";
import {IConversionCurrencyResponse} from "../models/conversion-currency.interface";
import {Routes} from "../shared/routes/routes";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConversionApiService {
  private readonly popularCurrencies = currencies;
  private readonly routes = Routes;
  private readonly apiHostUrl = environment.currencyExchangeApiHost
  private readonly apiClientKey = environment.currencyExchangeApiKey;

  constructor(private readonly httpClient: HttpClient) {
  }

  getPopularCurrencies(): Observable<ICurrency[]> {
    return of(this.popularCurrencies);
  }

  convertFromCurrencyToAnother(amount: number, fromCurrencyCode: string, toCurrencyCode: string): Observable<IConversionCurrencyResponse> {
    const conversionEndpoint = `${this.apiHostUrl}/${this.routes.conversionApiUrl}`;
    let requestParams = new HttpParams();
    requestParams.append('access_key', this.apiClientKey);
    requestParams.append('from', fromCurrencyCode);
    requestParams.append('to', toCurrencyCode);
    requestParams.append('amount', amount);
    return this.httpClient.get<IConversionCurrencyResponse>(conversionEndpoint, {params: requestParams});
  }
}
