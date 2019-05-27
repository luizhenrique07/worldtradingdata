
import { resolve } from 'path';
import { config } from 'dotenv';
import { RealTime } from './api/realTime';

config({ path: resolve(__dirname, '../.env') });
if (process.env.API_TOKEN === undefined || process.env.API_TOKEN === '') {
  throw new Error('API_TOKEN is required');
}

var realTime = new RealTime();
realTime.callAPI();
