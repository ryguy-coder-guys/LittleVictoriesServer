import { DataTypes, Model } from 'sequelize';
import { dbConnection } from '..';
import { User } from './user';

type frequencyRateType = 'daily' | 'weekly' | 'monthly';

interface HabitInstance extends Model {
  id: number;
  user_id: string;
  description: string;
  frequency: frequencyRateType;
  days_of_week: string;
  calendar_date: number;
  is_complete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const Habit = dbConnection.define<HabitInstance>(
  'Habit',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    frequency: {
      type: DataTypes.ENUM({values: ['daily', 'weekly', 'monthly']}),
      allowNull: false
    },
    days_of_week: {
      type: DataTypes.STRING
    },
    calendar_date: {
      type: DataTypes.INTEGER
    },
    is_complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
  },
  {
    timestamps: true,
  }
);
