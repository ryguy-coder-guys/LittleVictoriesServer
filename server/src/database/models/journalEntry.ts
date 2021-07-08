import { DataTypes, Optional, Model } from 'sequelize';
import { dbConnection } from '..';
import { User } from './user';

interface JournalEntryInstance extends Model {
  id: number;
  user_id: string;
  createdAt: Date;
  content: string;
  date: string;
}

export const JournalEntry = dbConnection.define<JournalEntryInstance>(
  'JournalEntry',
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
);
