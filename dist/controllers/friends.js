"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFriend = exports.addFriend = void 0;
const user_1 = require("../database/models/user");
const friend_1 = require("../database/models/friend");
exports.addFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        const user = await user_1.User.findOne({
            where: {
                id: userId
            }
        });
        if (!user) {
            res.send({ addSuccessful: false });
        }
        else {
            const friend = await user_1.User.findOne({
                where: {
                    id: friendId
                }
            });
            if (!friend) {
                res.send({ addSuccessful: false });
            }
            else {
                if (user && friend) {
                    const friendShip = await friend_1.Friend.create({
                        user_id: user.id,
                        friend_id: friend.id
                    });
                    if (!friendShip) {
                        res.send({ addSuccessful: false });
                    }
                    else {
                        const friendships = await friend_1.Friend.findAll({
                            where: { user_id: userId }
                        });
                        res.send({
                            addSuccessful: true,
                            numFollowees: friendships.length
                        });
                    }
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.removeFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        const user = await user_1.User.findOne({
            where: {
                id: userId
            }
        });
        if (!user) {
            res.send({ deleteSuccessful: false });
        }
        else {
            const friend = await user_1.User.findOne({
                where: {
                    id: friendId
                }
            });
            if (!friend) {
                res.send({ deleteSuccessful: false });
            }
            else {
                if (user && friend) {
                    await friend_1.Friend.destroy({
                        where: {
                            user_id: user.id,
                            friend_id: friend.id
                        }
                    });
                    const friendships = await friend_1.Friend.findAll({
                        where: { user_id: userId }
                    });
                    res.send({
                        deleteSuccessful: true,
                        numFollowees: friendships.length
                    });
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=friends.js.map