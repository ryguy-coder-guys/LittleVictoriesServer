import {DataTypes, Model} from 'sequelize';
import {dbConnection} from '..';
import {User} from './user';

interface FriendInstance extends Model {
  id: number,
  user_id: string,
  friend_id: string,
  createdAt: Date,
  updatedAt: Date,
}

export const Friend = dbConnection.define<FriendInstance>(
  'Friend',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    friend_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
)