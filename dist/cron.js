"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importDefault(require("shelljs"));
const cron_1 = require("cron");
console.log('Before job instantiation');
const job = new cron_1.CronJob('00 00 00 * * *', function () {
    if (shelljs_1.default.exec('ts-node-dev server/src/helpers/resetHabits').code !== 0) {
        console.log('something went wrong');
    }
    console.log('cron is executing, timestamp is:', new Date());
});
console.log('After job instantiation');
exports.default = job;
//# sourceMappingURL=cron.js.map