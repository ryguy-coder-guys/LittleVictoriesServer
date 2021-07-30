"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.users = exports.loginUser = exports.registerUser = void 0;
const achievement_1 = require("./../database/models/achievement");
const user_1 = require("../database/models/user");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const task_1 = require("../database/models/task");
const journalEntry_1 = require("../database/models/journalEntry");
const date_fns_1 = require("date-fns");
const stat_1 = require("../database/models/stat");
const habit_1 = require("../database/models/habit");
const friend_1 = require("../database/models/friend");
const like_1 = require("../database/models/like");
const comment_1 = require("../database/models/comment");
const customIsPast = (date) => {
    const currentDate = new Date();
    if (date.getFullYear() < currentDate.getFullYear())
        return true;
    if (date.getFullYear() > currentDate.getFullYear())
        return false;
    if (date.getMonth() < currentDate.getMonth())
        return true;
    if (date.getMonth() > currentDate.getMonth())
        return false;
    if (date.getDate() + 1 < currentDate.getDate())
        return true;
    // if (date.getDate() + 1 >= currentDate.getDate()) return false;
    return false;
};
const getHash = async (password) => await bcrypt_1.default.hash(password, 12);
const validate = async (username, password) => {
    const user = await user_1.User.findOne({ where: { username } });
    if (!user) {
        return false;
    }
    const isPasswordCorrect = await bcrypt_1.default.compare(password, user.hash);
    return !isPasswordCorrect ? false : user;
};
// add return type Promise<false | user>
exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await user_1.User.findOne({ where: { username } });
    if (user) {
        res.send(false);
    }
    else {
        const newUser = await user_1.User.create({
            id: uuid_1.v4(),
            username,
            hash: await getHash(password)
        });
        const formattedUser = {
            id: newUser.id,
            username: newUser.username,
            tasks: [],
            entries: [],
            habits: [],
            points: 0,
            readable_font: false,
            userStats: []
        };
        res.send(formattedUser);
    }
};
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    const isValid = await validate(username, password);
    if (!isValid) {
        res.send(false);
    }
    else {
        const user = await user_1.User.findOne({ where: { username } });
        if (user) {
            const tasks = await task_1.Task.findAll({
                where: { user_id: user.id },
                order: [['due_date', 'ASC']]
            });
            const userStat = await stat_1.UserStat.findOne({
                where: { date: date_fns_1.format(new Date(), 'MM-dd-yyyy'), user_id: user.id }
            });
            const userStats = await stat_1.UserStat.findAll({
                where: { user_id: user.id }
            });
            const habits = await habit_1.Habit.findAll({ where: { user_id: user.id } });
            const mappedUser = {
                id: user.getDataValue('id'),
                username: user.getDataValue('username'),
                points: user.getDataValue('points'),
                level: user.getDataValue('level'),
                readable_font: user.getDataValue('readable_font')
            };
            const mappedTasks = tasks
                .filter((task) => task.getDataValue('is_complete') === 0 ||
                !customIsPast(new Date(task.getDataValue('due_date'))))
                .map((task) => {
                return {
                    id: task.getDataValue('id'),
                    description: task.getDataValue('description'),
                    due_date: task.getDataValue('due_date'),
                    minutes_to_complete: task.getDataValue('minutes_to_complete'),
                    is_important: task.getDataValue('is_important'),
                    is_complete: task.getDataValue('is_complete'),
                    is_public: task.getDataValue('is_public')
                };
            });
            const entries = await journalEntry_1.JournalEntry.findAll({
                where: { user_id: user.id },
                order: [['createdAt', 'DESC']]
            });
            const achievements = await achievement_1.Achievement.findAll({
                where: { user_id: user.id },
                order: [['createdAt', 'ASC']]
            });
            const completedTasks = await task_1.Task.findAll({
                where: { user_id: user.id, is_complete: true }
            });
            const followees = await friend_1.Friend.findAll({ where: { user_id: user.id } });
            const numFollowees = followees.length;
            const formattedUser = {
                ...mappedUser,
                tasks: mappedTasks,
                userStat: userStat,
                entries: entries ? entries : [],
                habits: habits ? habits : [],
                userStats: userStats ? userStats : [],
                achievements,
                numCompletedTasks: completedTasks.length,
                numFollowees
            };
            res.send(formattedUser);
        }
    }
};
exports.users = async (req, res) => {
    try {
        const { userId } = req.params;
        const users = await user_1.User.findAll();
        const mappedUsers = await Promise.all(users.map(async (user) => {
            const friendship = await friend_1.Friend.findOne({
                where: { user_id: userId, friend_id: user.getDataValue('id') }
            });
            return {
                id: user.getDataValue('id'),
                username: user.getDataValue('username'),
                isFriend: friendship ? true : false
            };
        }));
        res.status(200).send(mappedUsers);
    }
    catch (err) {
        console.log('error fetching ', err);
        res.sendStatus(500);
    }
};
exports.removeUser = async (req, res) => {
    try {
        const { id } = req.params;
        await like_1.Like.destroy({ where: { user_id: id } });
        await comment_1.Comment.destroy({ where: { user_id: id } });
        await friend_1.Friend.destroy({ where: { user_id: id } });
        await stat_1.UserStat.destroy({ where: { user_id: id } });
        await journalEntry_1.JournalEntry.destroy({ where: { user_id: id } });
        await habit_1.Habit.destroy({ where: { user_id: id } });
        await task_1.Task.destroy({ where: { user_id: id } });
        await user_1.User.destroy({ where: { id: id } });
        res.status(201).send(`User ${id} has been deleted from DB.`);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};
//# sourceMappingURL=auth.js.map