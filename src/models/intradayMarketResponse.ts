export interface IntradayMarketResponse {
  symbol: string;
  stock_exchange_short: string;
  timezone_name: string;
  intraday: Intraday;
}

export interface Intraday {
  [key: string]: DayData;
}

export interface DayData {
  open: string;
  close: string;
  high: string;
  low: string;
  volume: string;
}
