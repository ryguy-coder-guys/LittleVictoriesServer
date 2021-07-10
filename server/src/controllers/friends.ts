import { RequestHandler } from 'express';
import { User } from '../database/models/user';
import { Friend } from '../database/models/friend';
import { AddFriendReqBody } from '../interfaces/friends';
import { RemoveFriendReqParams } from '../interfaces/friends';

export const addFriend: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { userId, friendId } = req.body as AddFriendReqBody;
    const user = await User.findOne({
      where: {
        id: userId
      }
    });
    if (!user) {
      res.send({ addSuccessful: false });
    } else {
      const friend = await User.findOne({
        where: {
          id: friendId
        }
      });
      if (!friend) {
        res.send({ addSuccessful: false });
      } else {
        if (user && friend) {
          const friendShip = await Friend.create({
            user_id: user.id,
            friend_id: friend.id
          });

          if (!friendShip) {
            res.send({ addSuccessful: false });
          } else {
            const friendships = await Friend.findAll({
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
  } catch (error) {
    console.log(error);
  }
};

export const removeFriend: RequestHandler<RemoveFriendReqParams> = async (
  req,
  res
): Promise<void> => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findOne({
      where: {
        id: userId
      }
    });
    if (!user) {
      res.send({ deleteSuccessful: false });
    } else {
      const friend = await User.findOne({
        where: {
          id: friendId
        }
      });
      if (!friend) {
        res.send({ deleteSuccessful: false });
      } else {
        if (user && friend) {
          await Friend.destroy({
            where: {
              user_id: user.id,
              friend_id: friend.id
            }
          });
          const friendships = await Friend.findAll({
            where: { user_id: userId }
          });
          res.send({
            deleteSuccessful: true,
            numFollowees: friendships.length
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
