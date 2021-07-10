"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeComment = exports.addComment = void 0;
const comment_1 = require("../database/models/comment");
const user_1 = require("../database/models/user");
const addComment = async (req, res) => {
    try {
        const { user_id, task_id, content } = req.body;
        const comment = await comment_1.Comment.create({
            user_id,
            task_id,
            content
        });
        const user = await user_1.User.findOne({
            where: { id: comment.getDataValue('user_id') }
        });
        if (user) {
            res.send({
                id: comment.getDataValue('id'),
                content: comment.getDataValue('content'),
                user_id: comment.getDataValue('user_id'),
                username: user.getDataValue('username'),
                task_id: comment.getDataValue('task_id')
            });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.addComment = addComment;
const removeComment = async (req, res) => {
    const { id } = req.params;
    await comment_1.Comment.destroy({ where: { id } });
    res.send(true);
};
exports.removeComment = removeComment;
//# sourceMappingURL=comments.js.map