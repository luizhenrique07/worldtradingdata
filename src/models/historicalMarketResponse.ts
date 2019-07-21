import { DayData } from "./dayData";

export interface HistoricalMarketResponse {
  name: string;
  history: Historical;
}

export interface Historical {
  [key: string]: DayData;
}
