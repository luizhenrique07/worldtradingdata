export interface StockSearchResponse {
  total_returned: number;
  total_results: number;
  total_pages: number;
  limit: number;
  page: number;
  data: StockSeatchData[];
}

export interface StockSeatchData {
  symbol: string;
  name: string;
  currency: string;
  price: string;
  stock_exchange_long: string;
  stock_exchange_short: string;
}
