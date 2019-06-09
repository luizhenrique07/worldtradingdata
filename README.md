# worldtradingdata

Node.js wrapper for World Trading Data API

### Table of Contents

- [constructor][1]
  - [Parameters][2]
- [realTime][3]
  - [Parameters][4]
- [mutualFundRealTime][5]
  - [Parameters][6]
- [intradayMarketData][7]
  - [Parameters][8]
- [fullHistory][9]
  - [Parameters][10]
- [multiSingleDayHistory][11]
  - [Parameters][12]
- [forex][13]
  - [Parameters][14]
- [forexHistory][15]
  - [Parameters][16]
- [forexSingleDay][17]
  - [Parameters][18]
- [stockSearch][19]
  - [Parameters][20]

## constructor

A wrapper for the World Trading Data API

### Parameters

- `token` API token

## realTime

Returns the nearest trading data for stocks and indexes worldwide.

### Parameters

- `symbols` Array with stocks you wish to return.
- `sortOrder` Change the sort order of values. Options: 'asc', 'desc'.
- `sortBy` Sort by a particular data attribute or by the order you entered the list. Options: symbol, name, list_order
- `output` Change output to CSV. Options: 'csv', 'json'.

## mutualFundRealTime

The endpoint allows up to 500 mutual funds to be returned with each request in exceptional timing.

### Parameters

- `symbols` Array with stocks you wish to return.
- `sortOrder` Change the sort order of values. Options: 'asc', 'desc'.
- `sortBy` Sort by a particular data attribute or by the order you entered the list. Options: symbol, name, list_order
- `output` Change output to CSV. Options: 'csv', 'json'.

## intradayMarketData

Return a stream of the latest data for stocks and indexes worldwide.

### Parameters

- `symbol` Value of the stock, index or mutual fund you wish to return data for. Only one symbol per request.
- `interval` Number of minutes between the data. Options: 1, 2, 5, 60.
- `range` The number of days data is returned for. Options: 1-30.
- `sort` Change the sort order of values. Options: 'asc', 'desc'.
- `output` Change output to CSV. Options: 'csv', 'json'.
- `formatted` Alter JSON data format. Does not affect CSV. Options: true, false.

## fullHistory

Return the end of day history for every day the stock, index or mutual fund has been traded.

### Parameters

- `symbol` Value of the stock, index or mutual fund you wish to return data for.
- `date_from`
- `date_to`
- `sort` Change the sort order of values. Options: 'asc', 'desc'.
- `output` Change output to CSV. Options: 'csv', 'json'.
- `formatted` Alter JSON data format. Does not affect CSV. Options: true, false.
- `interval` Number of minutes between the data. Options: 1, 2, 5, 60.
- `range` The number of days data is returned for. Options: 1-30.

## multiSingleDayHistory

Returns data for multiple stock, index or mutual funds for a single specific day.

### Parameters

- `symbols` Comma seperated values of the tickers you wish to return.
- `date` The date you wish to retrieve data for.
- `sort` Change the sort order of values. Options: 'asc', 'desc'.
- `output` Change output to CSV. Options: 'csv', 'json'.
- `formatted` Alter JSON data format. Does not affect CSV. Options: true, false.

## forex

Returns all the conversion rates for the base currency in exceptional timing.

### Parameters

- `base` Value of the currency you wish to return data for.

## forexHistory

Returns the end of day conversion rate for each day of data.

### Parameters

- `base` Base of the currency you wish to return data for.
- `convertTo` Value of the currency you wish to return conversion data to.
- `sort` Change the sort order of values. Options: 'asc', 'desc'.
- `output` Change output to CSV. Options: 'csv', 'json'.
- `formatted` Alter JSON data format. Does not affect CSV. Options: true, false.

## forexSingleDay

eturn the all the conversion rates for the base currency for a specific date in exceptional timing.

### Parameters

- `base` Value of the currency you wish to return data for.
- `date` Date you wish to return the conversion data for.
- `output` Change output to CSV. Options: 'csv', 'json'.
- `formatted` Alter JSON data format. Does not affect CSV. Options: true, false.

## stockSearch

Search and filter the entire stock and index database to build your own search functionality for your applications.

### Parameters

- `searchTerm` Search term you wish to find stocks for. Example: AAPL
- `searchBy` Search by only symbol or name, or both. Options: symbol, name, symbol, name.
- `stockExchange` Filter by a array of stock exchanges.
- `currency` Filter by a array of currencies.
- `limit` Limit the number of results returned. Options: 1-500
- `page` Value of the page you wish to see values for.
- `sortBy` Sort by a specific column. Options: symbol, name, currency, stock_exchange_long, stock_exchange_short, market_cap, volume, change_pct.
- `sortOrder` Change the sort order of values. Options: 'asc', 'desc'.
- `output` Change output to CSV. Options: 'csv', 'json'.

[1]: #constructor
[2]: #parameters
[3]: #realtime
[4]: #parameters-1
[5]: #mutualfundrealtime
[6]: #parameters-2
[7]: #intradaymarketdata
[8]: #parameters-3
[9]: #fullhistory
[10]: #parameters-4
[11]: #multisingledayhistory
[12]: #parameters-5
[13]: #forex
[14]: #parameters-6
[15]: #forexhistory
[16]: #parameters-7
[17]: #forexsingleday
[18]: #parameters-8
[19]: #stocksearch
[20]: #parameters-9
