
import { resolve } from 'path';
import { config } from 'dotenv';
import { WorldTradingDataWrapper as Wtd } from './request/worldTradingDataWrapper';

config({ path: resolve(__dirname, '../.env') });
if (process.env.API_TOKEN === undefined || process.env.API_TOKEN === '') {
  throw new Error('API_TOKEN is required');
}

var wtd = new Wtd();
var stocks = ['B3SA3.SA'];

async function main(): Promise<void> {
  var teste: any = await wtd.realTime(stocks);
  console.log(teste);
}

main();
