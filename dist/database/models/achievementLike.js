"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementLike = void 0;
const sequelize_1 = require("sequelize");
const __1 = require("..");
const user_1 = require("./user");
const achievement_1 = require("./achievement");
exports.AchievementLike = __1.dbConnection.define('AchievementsLike', {
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
    achievement_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: achievement_1.Achievement,
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
//# sourceMappingURL=achievementLike.js.map