import sequelize from 'sequelize';
import { Sequelize } from 'sequelize';
import path from 'path';
import redis from 'redis';

const DB_NAME = 'little_victories';
const DB_USER = 'jon';
// const DB_USER = 'root';
const DB_PASSWORD = '';

export const dbConnection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'mysql'
});

dbConnection
  .authenticate()
  .then(() => console.log('little victories database connection successful'))
  .catch((err) => {
    console.log('little victories database connection unsuccessful');
    console.log(err);
  });

export const client = redis.createClient();
client.on('connect', () => console.log('connection to redis db successful'));
