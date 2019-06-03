import { DayData } from './dayData';

export interface MultiSingleDayHistoryResponse{
  date: Date;
  data: Stock;
}

interface Stock{
  [key: string]: DayData;
}
