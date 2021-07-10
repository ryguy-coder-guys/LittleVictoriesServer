"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Habit = void 0;
const sequelize_1 = require("sequelize");
const __1 = require("..");
const user_1 = require("./user");
exports.Habit = __1.dbConnection.define('Habit', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: user_1.User,
            key: 'id'
        },
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    frequency: {
        type: sequelize_1.DataTypes.ENUM({ values: ['daily', 'weekly', 'monthly'] }),
        allowNull: false
    },
    days_of_week: {
        type: sequelize_1.DataTypes.STRING
    },
    calendar_date: {
        type: sequelize_1.DataTypes.INTEGER
    },
    is_complete: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=habit.js.map