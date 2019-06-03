import { ForexData } from './forexData';

export interface ForexHistoryResponse{
  symbol: string;
  history: ForexData;
}
