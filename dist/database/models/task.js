"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const sequelize_1 = require("sequelize");
const __1 = require("..");
const list_1 = require("./list");
const user_1 = require("./user");
exports.Task = __1.dbConnection.define('Task', {
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
        }
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    due_date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true
    },
    minutes_to_complete: {
        type: sequelize_1.DataTypes.INTEGER
        //allowNull: false,
    },
    is_important: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    is_complete: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    completed_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    is_public: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    list_id: {
        type: sequelize_1.DataTypes.INTEGER,
        //allowNull: false,
        references: {
            model: list_1.List,
            key: 'id'
        }
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true
});
//# sourceMappingURL=task.js.map