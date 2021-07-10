export interface AddFriendReqBody {
  userId: string;
  friendId: string;
}

export interface RemoveFriendReqParams {
  userId: string;
  friendId: string;
}

export interface FriendshipObject {
  userId: string;
  friendId: string;
}
