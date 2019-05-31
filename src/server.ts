
import { resolve } from 'path';
import { config } from 'dotenv';
import { WorldTradingDataWrapper as Wtd } from './request/worldTradingDataWrapper';

config({ path: resolve(__dirname, '../.env') });
if (process.env.API_TOKEN === undefined || process.env.API_TOKEN === '') {
  throw new Error('API_TOKEN is required');
}

var wtd = new Wtd();
var stocks = ['AAAAX', 'AAADX', 'AAAGX'];

async function main(): Promise<void> {
  var test = await wtd.historicalMarketData('B3SA3.SA', new Date(2019, 2, 1), new Date(2019, 3, 1));
  // console.log(test);
}

main();
