import { ForexData } from './forexData';

export interface ForexSingleDay{
  base: string;
  date: string;
  data: ForexData;
}
