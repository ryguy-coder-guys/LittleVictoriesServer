"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const sequelize_1 = require("sequelize");
const __1 = require("..");
const user_1 = require("./user");
const task_1 = require("./task");
exports.Comment = __1.dbConnection.define('Comment', {
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
    task_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: task_1.Task,
            key: 'id',
        },
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=comment.js.map