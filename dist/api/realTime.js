"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worldTradingDataWrapper_1 = require("../request/worldTradingDataWrapper");
class RealTime extends worldTradingDataWrapper_1.RequestApi {
    constructor() {
        super('stock?api_token=CKvSVXdtnuEonOIFD1ans3oXNOlFaJ2QE4cWLxnqalLfTyd6DeNnrJfIPFpk&symbol=B3SA3.SA');
    }
}
exports.RealTime = RealTime;
//# sourceMappingURL=realTime.js.map