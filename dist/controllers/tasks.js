"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedItems = exports.markTaskAsPrivate = exports.markTaskAsPublic = exports.markTaskAsIncomplete = exports.markTaskAsComplete = exports.removeTask = exports.addTask = exports.getTasks = void 0;
const friend_1 = require("../database/models/friend");
const sequelize_1 = __importDefault(require("sequelize"));
const task_1 = require("../database/models/task");
const user_1 = require("../database/models/user");
const like_1 = require("../database/models/like");
const comment_1 = require("../database/models/comment");
const ptsToLvlUp = 250;
const getTasks = async (req, res) => {
    const tasks = await task_1.Task.findAll();
    res.send(tasks);
};
exports.getTasks = getTasks;
const addTask = async (req, res) => {
    const { user_id, description, due_date, minutes_to_complete, is_important
    // list_id,
     } = req.body;
    try {
        const user = await user_1.User.findOne({ where: { id: user_id } });
        if (!user) {
            res.send(`no user found with id of ${user_id}`);
        }
        else {
            const newTask = await task_1.Task.create({
                user_id,
                description,
                due_date,
                minutes_to_complete,
                is_important,
                is_complete: false,
                is_public: false
                //list_id,
            });
            res.send({
                id: newTask.getDataValue('id'),
                description: newTask.getDataValue('description'),
                due_date: newTask.getDataValue('due_date'),
                is_complete: newTask.getDataValue('is_complete'),
                is_important: newTask.getDataValue('is_important'),
                minutes_to_complete: newTask.getDataValue('minutes_to_complete')
            });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.log('entry submission error', err.message);
        }
        res.sendStatus(500);
    }
};
exports.addTask = addTask;
const removeTask = async (req, res) => {
    const { id } = req.params;
    await like_1.Like.destroy({ where: { task_id: id } });
    await comment_1.Comment.destroy({ where: { task_id: id } });
    await task_1.Task.destroy({ where: { id } });
    res.send(true);
};
exports.removeTask = removeTask;
const markTaskAsComplete = async (req, res) => {
    try {
        const { id } = req.params;
        await task_1.Task.update({ is_complete: true, completed_at: new Date() }, { where: { id } });
        const task = await task_1.Task.findOne({ where: { id } });
        if (!task) {
            throw new Error(`task with ${id} isn't in db`);
        }
        else {
            const minutes = task.getDataValue('minutes_to_complete');
            const user = await user_1.User.findOne({ where: { id: task.user_id } });
            if (!user) {
                throw new Error(`user with ${task.user_id} isn't in db`);
            }
            else {
                const currentPoints = user.getDataValue('points');
                const currentLevel = user.getDataValue('level');
                const returnVal = await user_1.User.update({
                    points: currentPoints + minutes < ptsToLvlUp
                        ? currentPoints + minutes
                        : (currentPoints + minutes) % ptsToLvlUp,
                    level: currentPoints + minutes < ptsToLvlUp
                        ? currentLevel
                        : currentLevel + 1
                }, { where: { id: task.user_id }, returning: true });
                const updatedUser = await user_1.User.findOne({ where: { id: task.user_id } });
                const completedTasks = await task_1.Task.findAll({
                    where: { user_id: task.user_id, is_complete: true }
                });
                const numCompletedTasks = completedTasks.length;
                res.send({
                    task,
                    points: updatedUser?.points,
                    level: updatedUser?.level,
                    numCompletedTasks
                });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.markTaskAsComplete = markTaskAsComplete;
const markTaskAsIncomplete = async (req, res) => {
    try {
        const { id } = req.params;
        await like_1.Like.destroy({ where: { task_id: id } });
        await comment_1.Comment.destroy({ where: { task_id: id } });
        await task_1.Task.update({ is_complete: false, is_public: false }, { where: { id } });
        const task = await task_1.Task.findOne({ where: { id } });
        if (!task) {
            throw new Error(`task with ${id} isn't in db`);
        }
        else {
            const minutes = task.getDataValue('minutes_to_complete');
            const user = await user_1.User.findOne({ where: { id: task.user_id } });
            if (!user) {
                throw new Error(`user with ${task.user_id} isn't in db`);
            }
            else {
                const currentPoints = user.getDataValue('points');
                const currentLevel = user.getDataValue('level');
                await user_1.User.update({
                    points: currentPoints - minutes < 0
                        ? ptsToLvlUp - (minutes - currentPoints)
                        : currentPoints - minutes,
                    level: currentPoints - minutes < 0 ? currentLevel - 1 : currentLevel
                }, { where: { id: task.user_id } });
                const updatedUser = await user_1.User.findOne({ where: { id: task.user_id } });
                const completedTasks = await task_1.Task.findAll({
                    where: { user_id: task.user_id, is_complete: true }
                });
                const numCompletedTasks = completedTasks.length;
                res.send({
                    task,
                    points: updatedUser?.points,
                    level: updatedUser?.level,
                    numCompletedTasks
                });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.markTaskAsIncomplete = markTaskAsIncomplete;
const markTaskAsPublic = async (req, res) => {
    try {
        const { id } = req.params;
        await task_1.Task.update({ is_public: true }, { where: { id } });
        const task = await task_1.Task.findOne({ where: { id } });
        const user = await user_1.User.findOne({ where: { id: task?.user_id } });
        res.send({
            username: user?.getDataValue('username'),
            description: task?.getDataValue('description'),
            completed_at: task?.getDataValue('completed_at'),
            id: task?.getDataValue('id'),
            likes: [],
            comments: []
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.markTaskAsPublic = markTaskAsPublic;
const markTaskAsPrivate = async (req, res) => {
    try {
        const { id } = req.params;
        await task_1.Task.update({ is_public: false }, { where: { id } });
        await comment_1.Comment.destroy({ where: { task_id: id } });
        await like_1.Like.destroy({ where: { task_id: id } });
        res.send(true);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.markTaskAsPrivate = markTaskAsPrivate;
const getFeedItems = async (req, res) => {
    try {
        const { id } = req.params;
        const friends = await friend_1.Friend.findAll({ where: { user_id: id } });
        const mappedFriends = friends.map((friend) => friend.getDataValue('friend_id'));
        mappedFriends.push(id);
        const feed = await task_1.Task.findAll({
            where: {
                is_public: true,
                user_id: { [sequelize_1.default.Op.in]: mappedFriends }
            },
            order: [['completed_at', 'DESC']],
            limit: 10
        });
        const mappedFeed = await Promise.all(feed.map(async (feedItem) => {
            const foundUser = await user_1.User.findOne({
                where: { id: feedItem.getDataValue('user_id') }
            });
            const foundUsername = foundUser?.getDataValue('username');
            let likes = await like_1.Like.findAll({
                where: { task_id: feedItem.getDataValue('id') }
            });
            const comments = await comment_1.Comment.findAll({
                where: { task_id: feedItem.getDataValue('id') }
            });
            const mappedComments = await Promise.all(comments.map(async (comment) => {
                const user = await user_1.User.findOne({ where: { id: comment.user_id } });
                return {
                    id: comment.getDataValue('id'),
                    content: comment.getDataValue('content'),
                    user_id: comment.getDataValue('user_id'),
                    username: user?.username
                };
            }));
            return {
                id: feedItem.getDataValue('id'),
                username: foundUsername,
                description: feedItem.getDataValue('description'),
                completed_at: feedItem.getDataValue('completed_at'),
                likes,
                comments: mappedComments
            };
        }));
        res.send(mappedFeed);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getFeedItems = getFeedItems;
//# sourceMappingURL=tasks.js.map