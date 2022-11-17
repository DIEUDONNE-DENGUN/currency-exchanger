import {Injectable} from "@angular/core";
import {CurrencyConversionMapper} from "./mappers/conversion-mapper";

@Injectable({
  providedIn: 'root'
})
/**
 * @author: Dieudonne Takougang
 * abstract communication between the data layer and the container services
 */
export class CurrencyConversionFacade {
  constructor(private readonly currencyConversionMapper: CurrencyConversionMapper) {
  }

  /**
   * convert a currency value to another currency equivalent
   */
  convertFromCurrencyToAnother(amount: number, fromCurrencyCode: string, toCurrencyCode: string) {

  }

  /**
   * get converted value for a given amount of a current
   */
  getConvertedFromCurrency() {

  }

  /**
   * check if currency converter is running by means of an observable
   */
  isConverting() {

  }

}
