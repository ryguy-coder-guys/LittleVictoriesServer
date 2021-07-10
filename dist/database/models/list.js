"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const sequelize_1 = require("sequelize");
const __1 = require("..");
exports.List = __1.dbConnection.define('List', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
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
//# sourceMappingURL=list.js.map