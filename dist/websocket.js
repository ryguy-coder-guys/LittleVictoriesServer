"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const socket_io_1 = require("socket.io");
const task_1 = require("./database/models/task");
const like_1 = require("./database/models/like");
const comment_1 = require("./database/models/comment");
const user_1 = require("./database/models/user");
const friend_1 = require("./database/models/friend");
const achievement_1 = require("./database/models/achievement");
const achievementComment_1 = require("./database/models/achievementComment");
const achievementLike_1 = require("./database/models/achievementLike");
const database_1 = require("./database");
const httpServer = http_1.createServer(app_1.default);
const options = {};
const io = new socket_io_1.Server(httpServer, options);
const fetchTask = async (id) => {
    const task = await task_1.Task.findOne({ where: { id } });
    const likes = await like_1.Like.findAll({ where: { task_id: id } });
    const comments = await comment_1.Comment.findAll({ where: { task_id: id } });
    const user = await user_1.User.findOne({
        where: { id: task?.getDataValue('user_id') }
    });
    const username = user?.getDataValue('username');
    const mappedComments = await Promise.all(comments.map(async (comment) => {
        const currentUser = await user_1.User.findOne({
            where: { id: comment.getDataValue('user_id') }
        });
        return {
            id: comment.getDataValue('id'),
            content: comment.getDataValue('content'),
            user_id: comment.getDataValue('user_id'),
            username: currentUser?.getDataValue('username')
        };
    }));
    return {
        id: task?.getDataValue('id'),
        username,
        description: task?.getDataValue('description'),
        completed_at: task?.getDataValue('completed_at'),
        likes,
        comments: mappedComments
    };
};
const getUserId = (socketId) => {
    return new Promise((resolve, reject) => {
        database_1.client.get(socketId, (err, clientId) => {
            if (err) {
                reject(err);
            }
            resolve(clientId ? clientId : null);
        });
    });
};
const fetchFriends = async (userId) => {
    const friends = await friend_1.Friend.findAll({ where: { friend_id: userId } });
    const mappedFriends = friends.map((friend) => friend.getDataValue('user_id'));
    return mappedFriends;
    // return new Promise((resolve, reject) => {
    //   client.lrange(userId, 0, -1, (error, response) => {
    //     if (error) {
    //       reject(error);
    //     }
    //     resolve(response);
    //   });
    // });
};
const updateFeed = async (taskId, socketId, event) => {
    const foundTask = await fetchTask(taskId);
    const userId = await getUserId(socketId);
    if (userId) {
        const friends = await fetchFriends(userId);
        const sockets = io.sockets.sockets;
        for (const currentSocket of sockets) {
            const currentUserId = await getUserId(currentSocket[0]);
            if (currentUserId && friends.includes(currentUserId)) {
                io.to(currentSocket[0]).emit(event, foundTask);
            }
        }
    }
};
const fetchAchievement = async (id) => {
    try {
        const achievement = await achievement_1.Achievement.findOne({ where: { id } });
        if (!achievement)
            throw new Error('cannot find achievement');
        const achievementLikes = await achievementLike_1.AchievementLike.findAll({
            where: { achievement_id: id }
        });
        const achievementComments = await achievementComment_1.AchievementComment.findAll({
            where: { achievement_id: id }
        });
        const user = await user_1.User.findOne({
            where: { id: achievement.getDataValue('user_id') }
        });
        // if (!user) throw new Error('cannot find user');
        const username = user.getDataValue('username');
        const mappedAchievementComments = await Promise.all(achievementComments.map(async (achievementComment) => {
            const currentUser = await user_1.User.findOne({
                where: { id: achievementComment.getDataValue('user_id') }
            });
            if (!currentUser)
                throw new Error('cannot fine current user');
            return {
                id: achievementComment.getDataValue('id'),
                content: achievementComment.getDataValue('content'),
                user_id: achievementComment.getDataValue('user_id'),
                username: currentUser.getDataValue('username')
            };
        }));
        return {
            id,
            username,
            description: achievement.getDataValue('achievement_type'),
            completed_at: achievement.getDataValue('createdAt'),
            likes: achievementLikes,
            comments: mappedAchievementComments,
            isAchievement: true
        };
    }
    catch (error) {
        console.log(error);
    }
};
const addAchievementToFeed = async (achievementId, socketId, event) => {
    const achievement = await fetchAchievement(achievementId);
    // if (!achievement) throw new Error('cannot find achievement');
    const userId = await getUserId(socketId);
    // if (!userId) throw new Error('cannot find user id');
    if (userId) {
        const friends = await fetchFriends(userId);
        const sockets = io.sockets.sockets;
        for (const currentSocket of sockets) {
            const currentUserId = await getUserId(currentSocket[0]);
            if (currentUserId && friends.includes(currentUserId)) {
                io.to(currentSocket[0]).emit(event, achievement);
            }
        }
    }
};
io.on('connection', (socket) => {
    socket.on('addToFeed', (task) => {
        updateFeed(task.id, socket.id, 'addToFeed');
    });
    socket.on('removeFromFeed', async (taskId) => {
        try {
            const userId = await getUserId(socket.id);
            if (userId) {
                const friends = await fetchFriends(userId);
                const sockets = io.sockets.sockets;
                for (const currentSocket of sockets) {
                    const currentUserId = await getUserId(currentSocket[0]);
                    if (currentUserId && friends.includes(currentUserId)) {
                        io.to(currentSocket[0]).emit('removeFromFeed', taskId);
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    socket.on('addLike', async (like) => {
        updateFeed(like.task_id, socket.id, 'addLike');
    });
    socket.on('removeLike', async (taskId) => {
        updateFeed(taskId, socket.id, 'removeLike');
    });
    socket.on('addComment', async (comment) => {
        updateFeed(comment.task_id, socket.id, 'addComment');
    });
    socket.on('removeComment', async (taskId) => {
        updateFeed(taskId, socket.id, 'removeComment');
    });
    socket.on('loggedIn', async (userId) => {
        database_1.client.set(socket.id.toString(), userId.toString());
        // const friendships = await Friend.findAll({
        //   where: { friend_id: userId },
        //   attributes: ['user_id']
        // });
        // const mappedFriendships = friendships.map((friendship) =>
        //   friendship.getDataValue('user_id')
        // );
        // for (const currentFriendship of mappedFriendships) {
        //   client.rpush(userId.toString(), currentFriendship.toString());
        // }
    });
    socket.on('loggedOut', (userId) => {
        database_1.client.del(socket.id);
        // client.del(userId);
    });
    socket.on('addFriend', (friendshipObj) => {
        const { userId, friendId } = friendshipObj;
        database_1.client.rpush(userId, friendId);
    });
    socket.on('removeFriend', (friendshipObj) => {
        const { userId, friendId } = friendshipObj;
        database_1.client.lrange(userId, 0, -1, (err, friendships) => {
            const filtered = friendships.filter((friendship) => {
                friendship !== friendId;
            });
            database_1.client.del(userId, () => {
                for (const currentFriendship of filtered) {
                    database_1.client.rpush(userId, currentFriendship);
                }
            });
        });
    });
    socket.on('achievementAdded', async (achievementObject) => {
        const userId = await getUserId(socket.id);
        if (userId) {
            const user = await user_1.User.findOne({ where: { id: userId } });
            if (user) {
                const username = user.getDataValue('username');
                if (username) {
                    const friends = await fetchFriends(userId);
                    const sockets = io.sockets.sockets;
                    for (const currentSocket of sockets) {
                        const currentUserId = await getUserId(currentSocket[0]);
                        if (currentUserId && friends.includes(currentUserId)) {
                            io.to(currentSocket[0]).emit('achievementAdded', {
                                ...achievementObject,
                                username
                            });
                        }
                    }
                    io.to(socket.id).emit('achievementAdded', {
                        ...achievementObject,
                        username
                    });
                }
            }
        }
    });
    socket.on('addAchievementComment', async (commentObj) => {
        addAchievementToFeed(commentObj.task_id, socket.id, 'addAchievementComment');
    });
    socket.on('removeAchievementComment', async (achievementId) => {
        addAchievementToFeed(achievementId, socket.id, 'removeAchievementComment');
    });
    socket.on('addAchievementLike', async (likeObj) => {
        console.log(likeObj);
        addAchievementToFeed(likeObj.achievement_id, socket.id, 'addAchievementLike');
    });
    socket.on('removeAchievementLike', async (achievementId) => {
        console.log(achievementId);
        addAchievementToFeed(achievementId, socket.id, 'removeAchievementLike');
    });
});
exports.default = httpServer;
//# sourceMappingURL=websocket.js.map