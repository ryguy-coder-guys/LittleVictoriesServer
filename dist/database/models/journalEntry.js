"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalEntry = void 0;
const sequelize_1 = require("sequelize");
const __1 = require("..");
const user_1 = require("./user");
exports.JournalEntry = __1.dbConnection.define('JournalEntry', {
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
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});
//# sourceMappingURL=journalEntry.js.map