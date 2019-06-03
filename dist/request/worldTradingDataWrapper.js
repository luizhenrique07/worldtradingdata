"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("https");
const querystring = __importStar(require("querystring"));
class WorldTradingDataWrapper {
    // Agent keepAlive true to decrease requests response time
    constructor() {
        this.requestOptions = {};
        this.staticPath = '/api/v1/';
        this.isCsvFormat = false;
        this.agent = new https_1.Agent({
            keepAlive: true
        });
        this.requestOptions.host = 'api.worldtradingdata.com';
        this.requestOptions.method = 'GET';
        this.token = process.env.API_TOKEN;
    }
    /**
     * Returns the nearest trading data for stocks and indexes worldwide.
     * @param symbols Array with stocks you wish to return.
     * @param sortOrder Change the sort order of values. Options: 'asc', 'desc'.
     * @param sortBy Sort by a particular data attribute or by the order you entered the list. Options: symbol, name, list_order
     * @param output Change output to CSV. Options: 'csv', 'json'.
     */
    realTime(symbols, sortOrder, sortBy, output) {
        var symbol = this.joinSymbols(symbols);
        var props = {
            api_token: this.token,
            symbol,
            sort_order: sortOrder,
            sort_by: sortBy,
            output
        };
        this.setRequestPath('stock', props);
        var result = this.callAPI();
        return result;
    }
    /**
     * The endpoint allows up to 500 mutual funds to be returned with each request in exceptional timing.
     * @param symbols Array with stocks you wish to return.
     * @param sortOrder Change the sort order of values. Options: 'asc', 'desc'.
     * @param sortBy Sort by a particular data attribute or by the order you entered the list. Options: symbol, name, list_order
     * @param output Change output to CSV. Options: 'csv', 'json'.
     */
    mutualFundRealTime(symbols, sortOrder, sortBy, output) {
        var symbol = this.joinSymbols(symbols);
        var props = {
            api_token: this.token,
            symbol,
            sort_order: sortOrder,
            sort_by: sortBy,
            output
        };
        this.setRequestPath('mutualfund', props);
        this.requestOptions.path = this.staticPath + 'mutualfund?' + querystring.stringify(props);
        var result = this.callAPI();
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
    intradayMarketData(symbol, interval, range, sort, output, formatted) {
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
        var result = this.callAPI({ host: 'intraday.worldtradingdata.com' });
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
    fullHistory(symbol, date_from, date_to, sort, output, formatted) {
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
        var result = this.callAPI();
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
    multiSingleDayHistory(symbols, date, sort, output, formatted) {
        var props = {
            api_token: this.token,
            date: date.toISOString().substr(0, 10),
            symbol: this.joinSymbols(symbols),
            sort,
            output,
            formatted
        };
        this.setRequestPath('history_multi_single_day', props);
        var result = this.callAPI();
        return result;
    }
    /**
     * Returns all the conversion rates for the base currency in exceptional timing.
     * @param base Value of the currency you wish to return data for.
     */
    forex(base) {
        var props = {
            api_token: this.token,
            base
        };
        this.setRequestPath('forex', props);
        var result = this.callAPI();
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
    forexHistory(base, convertTo, sort, output, formatted) {
        var props = {
            api_token: this.token,
            base,
            convert_to: convertTo,
            sort,
            output,
            formatted
        };
        this.setRequestPath('forex_history', props);
        var result = this.callAPI();
        return result;
    }
    forexSingleDay(base, date, output, formatted) {
        var props = {
            api_token: this.token,
            base,
            date,
            output,
            formatted
        };
        this.setRequestPath('forex_single_day', props);
        var result = this.callAPI();
        return result;
    }
    setRequestPath(endPoint, props) {
        if (props.output === 'csv') {
            this.isCsvFormat = true;
        }
        else {
            this.isCsvFormat = false;
            console.log('era pra ser false');
        }
        this.requestOptions.path = this.staticPath + `${endPoint}?` + querystring.stringify(props);
        console.log(this.requestOptions.path);
    }
    joinSymbols(symbols) {
        var symbolUnified = '';
        symbols.forEach((symbol, index) => {
            if (index === symbols.length - 1) {
                symbolUnified += symbol;
            }
            else {
                symbolUnified += symbol + ',';
            }
        });
        return symbolUnified;
    }
    /**
     * Make a request using class prop requestOptions. Default Host: api.worldtradingdata.com, Method: 'GET'
     * @param param0 Object with host and/or http method
     */
    callAPI({ host = 'api.worldtradingdata.com', method = 'GET' } = {}) {
        this.requestOptions.host = host;
        this.requestOptions.method = method;
        return new Promise((resolve, reject) => {
            const req = https_1.request(this.requestOptions, (res) => {
                var body = '';
                console.log(this.requestOptions);
                res.on('data', (data) => {
                    body += data;
                });
                res.on('end', function () {
                    try {
                        console.log(this.isCsvFormat);
                        if (this.isCsvFormat === false) {
                            return resolve(JSON.parse(body));
                        }
                        else {
                            return resolve({ csv: body });
                        }
                    }
                    catch (error) {
                        reject(body);
                    }
                });
            });
            req.on('error', (error) => {
                console.log(error.message);
                return reject(error);
            });
            req.end();
        });
    }
}
exports.WorldTradingDataWrapper = WorldTradingDataWrapper;
//# sourceMappingURL=worldTradingDataWrapper.js.map