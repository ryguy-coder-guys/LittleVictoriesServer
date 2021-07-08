import { DataTypes, Model } from 'sequelize';
import { dbConnection } from '..';
import { User } from './user';
import { Task } from './task';

interface CommentInstance extends Model {
  id: number;
  user_id: string;
  task_id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export const Comment = dbConnection.define<CommentInstance>(
  'Comment',
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
        key: 'id',
      },
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Task,
        key: 'id',
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
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
);
