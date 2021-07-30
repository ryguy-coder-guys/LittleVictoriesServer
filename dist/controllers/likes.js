"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlikeTask = exports.likeTask = void 0;
const like_1 = require("../database/models/like");
exports.likeTask = async (req, res) => {
    try {
        const { userId, taskId } = req.body;
        const newLike = await like_1.Like.create({
            user_id: userId,
            task_id: taskId
        });
        res.send(newLike);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.unlikeTask = async (req, res) => {
    try {
        const { userId, taskId } = req.params;
        await like_1.Like.destroy({ where: { user_id: userId, task_id: taskId } });
        res.send(true);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
//# sourceMappingURL=likes.js.map