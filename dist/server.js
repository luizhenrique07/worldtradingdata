"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const dotenv_1 = require("dotenv");
const worldTradingDataWrapper_1 = require("./request/worldTradingDataWrapper");
dotenv_1.config({ path: path_1.resolve(__dirname, '../.env') });
if (process.env.API_TOKEN === undefined || process.env.API_TOKEN === '') {
    throw new Error('API_TOKEN is required');
}
var wtd = new worldTradingDataWrapper_1.WorldTradingDataWrapper();
var stocks = ['AAAAX', 'AAADX', 'AAAGX'];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var test = yield wtd.forexSingleDay('BRL', new Date(2019, 4, 27));
            console.log(test);
        }
        catch (error) {
            // console.log(error);
        }
    });
}
main();
//# sourceMappingURL=server.js.map