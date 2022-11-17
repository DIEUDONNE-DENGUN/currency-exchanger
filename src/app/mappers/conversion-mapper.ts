import {Injectable} from "@angular/core";
import {IConversionCurrencyResponse} from "../models/conversion-currency.interface";
import {ICurrencyConvertedPair} from "../models/currency-converted-pair.interface";

@Injectable({
  providedIn: "root"
})
/**
 * convert the conversion currency pair response from api to format to be use by consuming services
 */
export class CurrencyConversionMapper {
  convertApiResponseToConvertedPair(apiConversionResponse: IConversionCurrencyResponse): ICurrencyConvertedPair {
    return {
      fromCurrency: apiConversionResponse.query.from,
      toCurrency: apiConversionResponse.query.to,
      rate: apiConversionResponse.info.rate,
      result: apiConversionResponse.result
    };
  }
}
