import { WorldTradingDataWrapper as Wtd } from './request/worldTradingDataWrapper';

var token = 'CKvSVXdtnuEonOIFD1ans3oXNOlFaJ2QE4cWLxnqalLfTyd6DeNnrJfIPFpk';

var wtd = new Wtd(token);
var stocks = ['AAAAX', 'AAADX', 'AAAGX'];

async function main(): Promise<void> {
  try {
    var test = await wtd.forex('BRL');
    console.log(test.data);
  } catch (error) {
    console.log(error);
  }
}

main();
