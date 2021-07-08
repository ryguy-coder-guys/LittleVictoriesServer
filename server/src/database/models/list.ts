import { DataTypes, Optional, Model } from 'sequelize';
import { dbConnection } from '..';

interface ListInstance extends Model {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export const List = dbConnection.define<ListInstance>(
  'List',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
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
