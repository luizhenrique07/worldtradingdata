import { RealTimeBody } from '../interfaces/realTimeResponse';
import { RequestApi } from '../request/worldTradingDataWrapper';

export class RealTime extends RequestApi {
  public requestApi: RequestApi;

  public constructor() {
    super('stock?api_token=CKvSVXdtnuEonOIFD1ans3oXNOlFaJ2QE4cWLxnqalLfTyd6DeNnrJfIPFpk&symbol=B3SA3.SA');
  }
}
