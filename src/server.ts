
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
  var test = await wtd.multiSingleDayHistory(['B3SA3.SA', 'AAPL'], new Date(2019, 3, 26));
  console.log(test);
}

main();
