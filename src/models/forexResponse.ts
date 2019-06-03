import { ForexData } from './forexData';

export interface ForexResponse{
  symbols_returned: number;
  base: string;
  data: ForexData;
}
