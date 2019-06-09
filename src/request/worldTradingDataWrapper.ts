/* eslint-disable @typescript-eslint/camelcase */
import { ClientRequest } from 'http';
import { RequestOptions, Agent, request } from 'https';
import * as querystring from 'querystring';
import { RealTimeResponse } from '../models/realTimeResponse';
import { IntradayMarketResponse } from '../models/intradayMarketResponse';
import { HistoricalMarketResponse } from '../models/historicalMarketResponse';
import { MultiSingleDayHistoryResponse } from '../models/multiSingleDayHistoryResponse';
import { StockSearchResponse } from '../models/stockSearchResponse';
import { ForexResponse } from '../models/forexResponse';
import { ForexHistoryResponse } from '../models/forexHistoryResponse';
import { ForexSingleDay } from '../models/forexSingleDay';

export class WorldTradingDataWrapper {
  private requestOptions: RequestOptions = {};
  private staticPath: string = '/api/v1/';
  private agent: Agent;
  private token: string
  private isCsvFormat: boolean = false;

  /**
   * A wrapper for the World Trading Data API
   * @param token API token
   */
  public constructor(token: string) {
    this.agent = new Agent({
      keepAlive: true
    });
    this.requestOptions.host = 'api.worldtradingdata.com';
    this.requestOptions.method = 'GET';
    this.token = token;
  }

  /**
   * Returns the nearest trading data for stocks and indexes worldwide.
   * @param symbols Array with stocks you wish to return.
   * @param sortOrder Change the sort order of values. Options: 'asc', 'desc'.
   * @param sortBy Sort by a particular data attribute or by the order you entered the list. Options: symbol, name, list_order
   * @param output Change output to CSV. Options: 'csv', 'json'.
   */
  public realTime(symbols: string[], sortOrder?: string, sortBy?: string, output?: string): Promise<RealTimeResponse> {
    var symbol = this.formatSymbolsFromArray(symbols);
    var props = {
      api_token: this.token,
      symbol,
      sort_order: sortOrder,
      sort_by: sortBy,
      output
    };

    this.setRequestPath('stock', props);
    var result = this.callAPI() as Promise<RealTimeResponse>;
    return result;
  }

  /**
   * The endpoint allows up to 500 mutual funds to be returned with each request in exceptional timing.
   * @param symbols Array with stocks you wish to return.
   * @param sortOrder Change the sort order of values. Options: 'asc', 'desc'.
   * @param sortBy Sort by a particular data attribute or by the order you entered the list. Options: symbol, name, list_order
   * @param output Change output to CSV. Options: 'csv', 'json'.
   */
  public mutualFundRealTime(symbols: string[], sortOrder?: string, sortBy?: string, output?: string): Promise<RealTimeResponse> {
    var symbol = this.formatSymbolsFromArray(symbols);
    var props = {
      api_token: this.token,
      symbol,
      sort_order: sortOrder,
      sort_by: sortBy,
      output
    };
    this.setRequestPath('mutualfund', props);
    this.requestOptions.path = this.staticPath + 'mutualfund?' + querystring.stringify(props);
    var result = this.callAPI() as Promise<RealTimeResponse>;
    return result;
  }

  /**
    * Return a stream of the latest data for stocks and indexes worldwide.
    * @param symbol Value of the stock, index or mutual fund you wish to return data for. Only one symbol per request.
    * @param interval Number of minutes between the data. Options: 1, 2, 5, 60.
    * @param range The number of days data is returned for. Options: 1-30.
    * @param sort Change the sort order of values. Options: 'asc', 'desc'.
    * @param output Change output to CSV. Options: 'csv', 'json'.
    * @param formatted Alter JSON data format. Does not affect CSV. Options: true, false.
    */
  public intradayMarketData(symbol: string, interval: number, range: number, sort?: string, output?: string, formatted? : boolean): Promise<IntradayMarketResponse> {
    var props = {
      api_token: this.token,
      interval,
      range,
      symbol,
      sort,
      output,
      formatted
    };

    this.setRequestPath('intraday', props);
    var result = this.callAPI({ host: 'intraday.worldtradingdata.com' }) as Promise<IntradayMarketResponse>;
    return result;
  }

  /**
    * Return the end of day history for every day the stock, index or mutual fund has been traded.
    * @param symbol Value of the stock, index or mutual fund you wish to return data for.
    * @param interval Number of minutes between the data. Options: 1, 2, 5, 60.
    * @param range The number of days data is returned for. Options: 1-30.
    * @param sort Change the sort order of values. Options: 'asc', 'desc'.
    * @param output Change output to CSV. Options: 'csv', 'json'.
    * @param formatted Alter JSON data format. Does not affect CSV. Options: true, false.
    */
  public fullHistory(symbol: string, date_from?: Date, date_to?: Date, sort?: string, output?: string, formatted? : boolean): Promise<HistoricalMarketResponse> {
    var props = {
      api_token: this.token,
      date_from: date_from.toISOString().substr(0, 10),
      date_to: date_to.toISOString().substr(0, 10),
      symbol,
      sort,
      output,
      formatted
    };

    this.setRequestPath('history', props);
    var result = this.callAPI() as Promise<HistoricalMarketResponse>;
    return result;
  }

  /**
    * Returns data for multiple stock, index or mutual funds for a single specific day.
    * @param symbols Comma seperated values of the tickers you wish to return.
    * @param date The date you wish to retrieve data for.
    * @param sort Change the sort order of values. Options: 'asc', 'desc'.
    * @param output Change output to CSV. Options: 'csv', 'json'.
    * @param formatted Alter JSON data format. Does not affect CSV. Options: true, false.
    */
  public multiSingleDayHistory(symbols: string[], date: Date, sort?: string, output?: string, formatted? : boolean): Promise<MultiSingleDayHistoryResponse> {
    var props = {
      api_token: this.token,
      date: date.toISOString().substr(0, 10),
      symbol: this.formatSymbolsFromArray(symbols),
      sort,
      output,
      formatted
    };

    this.setRequestPath('history_multi_single_day', props);
    var result = this.callAPI() as Promise<MultiSingleDayHistoryResponse>;
    return result;
  }

  /**
   * Returns all the conversion rates for the base currency in exceptional timing.
   * @param base Value of the currency you wish to return data for.
   */
  public forex(base: string): Promise<ForexResponse> {
    var props = {
      api_token: this.token,
      base
    };

    this.setRequestPath('forex', props);
    var result = this.callAPI() as Promise<ForexResponse>;
    return result;
  }

  /**
   * Returns the end of day conversion rate for each day of data.
   * @param base Base of the currency you wish to return data for.
   * @param convertTo Value of the currency you wish to return conversion data to.
   * @param sort Change the sort order of values. Options: 'asc', 'desc'.
   * @param output Change output to CSV. Options: 'csv', 'json'.
   * @param formatted Alter JSON data format. Does not affect CSV. Options: true, false.
   */
  public forexHistory(base: string, convertTo: string, sort?: string, output?: string, formatted?: string): Promise<ForexHistoryResponse> {
    var props = {
      api_token: this.token,
      base,
      convert_to: convertTo,
      sort,
      output,
      formatted
    };

    this.setRequestPath('forex_history', props);
    var result = this.callAPI() as Promise<ForexHistoryResponse>;
    return result;
  }

  /**
   * eturn the all the conversion rates for the base currency for a specific date in exceptional timing.
   * @param base Value of the currency you wish to return data for.
   * @param date Date you wish to return the conversion data for.
   * @param output Change output to CSV. Options: 'csv', 'json'.
   * @param formatted Alter JSON data format. Does not affect CSV. Options: true, false.
   */
  public forexSingleDay(base: string, date: Date, output?: string, formatted?: string): Promise<ForexSingleDay> {
    var props = {
      api_token: this.token,
      base,
      date: date.toISOString().substr(0, 10),
      output,
      formatted
    };

    this.setRequestPath('forex_single_day', props);
    var result = this.callAPI() as Promise<ForexSingleDay>;
    return result;
  }

  /**
   * Search and filter the entire stock and index database to build your own search functionality for your applications.
   * @param searchTerm Search term you wish to find stocks for. Example: AAPL
   * @param searchBy Search by only symbol or name, or both. Options: symbol, name, symbol, name.
   * @param stockExchange Filter by a array of stock exchanges.
   * @param currency Filter by a array of currencies.
   * @param limit Limit the number of results returned. Options: 1-500
   * @param page Value of the page you wish to see values for.
   * @param sortBy Sort by a specific column. Options: symbol, name, currency, stock_exchange_long, stock_exchange_short, market_cap, volume, change_pct.
   * @param sortOrder Change the sort order of values. Options: 'asc', 'desc'.
   * @param output Change output to CSV. Options: 'csv', 'json'.
   */
  public stockSearch(searchTerm?: string, searchBy?: string, stockExchange?: string[], currency?: string, limit?: number, page?: number, sortBy?: string, sortOrder?: string, output?: string): Promise<StockSearchResponse> {
    var props = {
      api_token: this.token,
      search_term: searchTerm,
      search_by: searchBy,
      stock_exchange: stockExchange ? this.formatSymbolsFromArray(stockExchange) : null,
      currency,
      limit,
      page,
      sort_by: sortBy,
      sort_order: sortOrder,
      output
    };

    this.setRequestPath('stock_search', props);
    var result = this.callAPI() as Promise<StockSearchResponse>;
    return result;
  }

  private setRequestPath(endPoint: string, props: any): void{
    if (props.output === 'csv') {
      this.isCsvFormat = true;
    } else {
      this.isCsvFormat = false;
    }
    this.requestOptions.path = this.staticPath + `${endPoint}?` + querystring.stringify(props);
    console.log(this.requestOptions.path);
  }

  private formatSymbolsFromArray(symbols: string[]): string {
    var symbolUnified = '';
    symbols.forEach((symbol, index): void => {
      if (index === symbols.length - 1) {
        symbolUnified += symbol;
      } else {
        symbolUnified += symbol + ',';
      }
    });
    return symbolUnified;
  }

  /**
   * Make a request using class prop requestOptions. Default Host: api.worldtradingdata.com, Method: 'GET'
   * @param param0 Object with host and/or http method
   */
  private callAPI(
    { host = 'api.worldtradingdata.com', method = 'GET' }: {host?: string; method?: string} = {}
  ): Promise<any> {
    this.requestOptions.host = host;
    this.requestOptions.method = method;

    return new Promise((resolve, reject): void => {
      const req: ClientRequest = request(
        this.requestOptions,
        (res): void => {
          var body = '';
          console.log(this.requestOptions);

          res.on(
            'data',
            (data): void => {
              body += data;
            }
          );

          res.on('end', (): void => {
            try {
              if (this.isCsvFormat === false) {
                return resolve(JSON.parse(body));
              } else {
                return resolve({ csv: body });
              }
            } catch (error) {
              reject(body);
            }
          });
        }
      );

      req.on('error', (error): void => {
        console.log(error.message);
        return reject(error);
      });

      req.end();
    });
  }
}
