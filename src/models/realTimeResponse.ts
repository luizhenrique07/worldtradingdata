export interface RealTimeResponse {
  symbols_requested: number;
  symbols_returned: number;
  data: Data[];
}

interface Data {
  symbol: string;
  name: string;
  price: string;
  currency: string;
  price_open: string;
  day_high: string;
  day_low: string;
  '52_week_high': string;
  '52_week_low': string;
  day_change: string;
  change_pct: string;
  close_yesterday: string;
  market_cap: string;
  volume: string;
  volume_avg: string;
  shares: string;
  stock_exchange_long: string;
  stock_exchange_short: string;
  timezone: string;
  timezone_name: string;
  gmt_offset: string;
  last_trade_time: string;
}
