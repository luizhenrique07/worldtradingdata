/* eslint-disable @typescript-eslint/camelcase */
import { ClientRequest } from 'http';
import { RequestOptions, Agent, request } from 'https';
import * as querystring from 'querystring';
import { RealTimeResponse } from '../interfaces/realTimeResponse';
import { IntradayMarketResponse } from '../interfaces/intradayMarketResponse';

export class WorldTradingDataWrapper {
  private options: RequestOptions = {};
  private staticPath: string = '/api/v1/';
  private agent: Agent;
  private token: string

  // Agent keepAlive true to decrease requests response time
  public constructor() {
    this.agent = new Agent({
      keepAlive: true
    });
    this.options.host = 'api.worldtradingdata.com';
    this.options.method = 'GET';
    this.token = process.env.API_TOKEN;
  }

  /**
   * Returns the nearest trading data for stocks and indexes worldwide.
   * @param symbols Array with stocks you wish to return.
   * @param sortOrder Change the sort order of values.
   * @param sortBy Sort by a particular data attribute or by the order you entered the list.
   * @param output Change output to CSV.
   */
  public realTime(symbols: string[], sortOrder?: string, sortBy?: string, output?: string): Promise<RealTimeResponse> {
    var symbol = this.joinSymbols(symbols);
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
   * @param sortOrder Change the sort order of values.
   * @param sortBy Sort by a particular data attribute or by the order you entered the list.
   * @param output Change output to CSV.
   */
  public MutualFundRealTime(symbols: string[], sortOrder?: string, sortBy?: string, output?: string): Promise<RealTimeResponse> {
    var symbol = this.joinSymbols(symbols);
    var props = {
      api_token: this.token,
      symbol,
      sort_order: sortOrder,
      sort_by: sortBy,
      output
    };
    this.setRequestPath('mutualfund', props);
    this.options.path = this.staticPath + 'mutualfund?' + querystring.stringify(props);
    var result = this.callAPI() as Promise<RealTimeResponse>;
    return result;
  }

  /**
   * Return a stream of the latest data for stocks and indexes worldwide.
   * @param symbol Value of the stock, index or mutual fund you wish to return data for. Only one symbol per request.
   * @param interval Number of minutes between the data.
   * @param range The number of days data is returned for.
   */
  public IntradayMarketData(symbol: string, interval: number, range: number): Promise<any> {
    var props = {
      api_token: this.token,
      interval,
      range,
      symbol
    };

    this.setRequestPath('intraday', props);
    var result = this.callAPI({ host: 'intraday.worldtradingdata.com' }) as Promise<any>;
    return result;
  }

  private setRequestPath(endPoint: string, props: any): void{
    this.options.path = this.staticPath + `${endPoint}?` + querystring.stringify(props);
    console.log(this.options.path
    );
  }

  private joinSymbols(symbols: string[]): string {
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

  private callAPI(
    { host = 'api.worldtradingdata.com', method = 'GET' }: {host?: string; method?: string} = {}
  ): Promise<any> {
    this.options.host = host;
    this.options.method = method;

    return new Promise((resolve, reject): void => {
      const req: ClientRequest = request(
        this.options,
        (res): void => {
          var body = '';
          console.log(this.options);

          res.on(
            'data',
            (data): void => {
              body += data;
            }
          );

          res.on('end', function(): void {
            console.log(JSON.parse(body).symbol);
            return resolve(JSON.parse(body));
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
