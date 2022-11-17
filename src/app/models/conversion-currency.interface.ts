/**
 * define the data type of the response from the conversion endpoint of the API
 */
export interface IConversionCurrencyResponse {
  success: boolean,
  query: ICurrencyQuery,
  info: ICurrencyConversionDateInfo,
  historical?: boolean
  date: string,
  result: number
}

export interface ICurrencyQuery {
  from: string,
  to: string,
  amount: number
}

export interface ICurrencyConversionDateInfo {
  timestamp: number,
  rate: number
}
