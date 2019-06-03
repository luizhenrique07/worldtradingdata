export interface IntradayMarketResponse {
  symbol: string;
  stock_exchange_short: string;
  timezone_name: string;
  intraday: Intraday;
}

interface Intraday{
  [key: string]: DayData;
}

interface DayData {
  open: string;
  close: string;
  high: string;
  low: string;
  volume: string;
}
