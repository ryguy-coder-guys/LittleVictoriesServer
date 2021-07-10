"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.dbConnection = void 0;
const sequelize_1 = require("sequelize");
const redis_1 = __importDefault(require("redis"));
const DB_NAME = 'little_victories';
// const DB_USER = 'jon';
const DB_USER = 'root';
const DB_PASSWORD = '';
exports.dbConnection = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: 'mysql'
});
exports.dbConnection
    .authenticate()
    .then(() => console.log('little victories database connection successful'))
    .catch((err) => {
    console.log('little victories database connection unsuccessful');
    console.log(err);
});
exports.client = redis_1.default.createClient();
exports.client.on('connect', () => console.log('connection to redis db successful'));
//# sourceMappingURL=index.js.map