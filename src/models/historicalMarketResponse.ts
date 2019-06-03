import { DayData } from './dayData';

export interface HistoricalMarketResponse{
  name: string;
  history: Historical;
}

interface Historical{
  [key: string]: DayData;
}
