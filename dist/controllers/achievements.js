"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLike = exports.addLike = exports.removeComment = exports.addComment = exports.addAchievement = void 0;
const user_1 = require("../database/models/user");
const achievement_1 = require("./../database/models/achievement");
const achievementLike_1 = require("./../database/models/achievementLike");
const achievementComment_1 = require("./../database/models/achievementComment");
const sequelize_1 = __importDefault(require("sequelize"));
exports.addAchievement = async (req, res) => {
    try {
        const { user_id, achievement_type } = req.body;
        const user = await user_1.User.findOne({ where: { id: user_id } });
        if (!user) {
            throw new Error("user isn't in db");
        }
        const foundAchievement = await achievement_1.Achievement.findOne({
            where: { user_id, achievement_type }
        });
        if (foundAchievement) {
            throw new Error('user already has achievement');
        }
        const newAchievement = await achievement_1.Achievement.create({
            user_id,
            achievement_type
        });
        if (!newAchievement) {
            throw new Error("couldn't add achievement to db");
        }
        res.status(201).send({
            id: newAchievement.getDataValue('id'),
            user_id: newAchievement.getDataValue('user_id'),
            achievement_type: newAchievement.getDataValue('achievement_type'),
            createdAt: newAchievement.getDataValue('createdAt'),
            updatedAt: newAchievement.getDataValue('updatedAt')
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
exports.addComment = async (req, res) => {
    try {
        console.log(req.body);
        const { userId, achievementId, content } = req.body;
        const newComment = await achievementComment_1.AchievementComment.create({
            user_id: userId,
            achievement_id: achievementId,
            content
        });
        if (!newComment) {
            throw new Error('failed to make new achievement comment');
        }
        const user = await user_1.User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("can't find user in db");
        }
        res.send({
            id: newComment.getDataValue('id'),
            content: newComment.getDataValue('content'),
            user_id: newComment.getDataValue('user_id'),
            username: user.getDataValue('username'),
            task_id: newComment.getDataValue('achievement_id')
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
exports.removeComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        await achievementComment_1.AchievementComment.destroy({ where: { id: commentId } });
        res.send(true);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
exports.addLike = async (req, res) => {
    try {
        const { userId, achievementId } = req.body;
        const newAchievementLike = await achievementLike_1.AchievementLike.create({
            user_id: userId,
            achievement_id: achievementId
        });
        if (!newAchievementLike) {
            throw new Error('unable to add achievement like to db');
        }
        res.send(newAchievementLike);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
exports.removeLike = async (req, res) => {
    try {
        const { userId, achievementId } = req.params;
        await achievementLike_1.AchievementLike.destroy({
            where: {
                [sequelize_1.default.Op.and]: [
                    { user_id: userId },
                    { achievement_id: achievementId }
                ]
            }
        });
        res.send(true);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
//# sourceMappingURL=achievements.js.map