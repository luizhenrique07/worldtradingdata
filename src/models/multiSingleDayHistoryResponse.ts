import { DayData } from "./dayData";

export interface MultiSingleDayHistoryResponse {
  date: Date;
  data: DayHistoryStock;
}

export interface DayHistoryStock {
  [key: string]: DayData;
}
