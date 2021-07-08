import { DataTypes, Model } from 'sequelize';
import { dbConnection } from '..';
import { User } from './user';

type moodType = 'great' | 'good' | 'ok' | 'bad' | 'terrible';

interface UserStatInstance extends Model {
  id: number;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
  sleep_hours: number;
  eaten_well: boolean;
  exercised: boolean;
  notes: string;
  mood: moodType;
  date: string;
}

export const UserStat = dbConnection.define<UserStatInstance>(
  'UserStat',
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    sleep_hours: {
      type: DataTypes.INTEGER,
    },
    eaten_well: {
      type: DataTypes.BOOLEAN,
    },
    exercised: {
      type: DataTypes.BOOLEAN,
    },
    notes: {
      type: DataTypes.STRING,
    },
    mood: {
      type: DataTypes.ENUM({
        values: ['great', 'good', 'ok', 'bad', 'terrible'],
      }),
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
