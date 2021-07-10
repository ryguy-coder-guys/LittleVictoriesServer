"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStat = void 0;
const sequelize_1 = require("sequelize");
const __1 = require("..");
const user_1 = require("./user");
exports.UserStat = __1.dbConnection.define('UserStat', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: user_1.User,
            key: 'id',
        },
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    sleep_hours: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    eaten_well: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    exercised: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    notes: {
        type: sequelize_1.DataTypes.STRING,
    },
    mood: {
        type: sequelize_1.DataTypes.ENUM({
            values: ['great', 'good', 'ok', 'bad', 'terrible'],
        }),
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=stat.js.map