"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const websocket_1 = __importDefault(require("./websocket"));
const cron_1 = __importDefault(require("./cron"));
database_1.dbConnection
    .sync()
    .then(() => {
    console.log('little victories database successfully synced...');
    const PORT = 3000;
    websocket_1.default.listen(PORT, () => {
        console.log(`little victories server listening on port ${PORT}`);
        cron_1.default.start();
    });
})
    .catch((err) => {
    console.log('little victories database unsuccessfully synced');
    console.log(err);
});
//# sourceMappingURL=index.js.map