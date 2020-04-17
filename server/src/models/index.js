import fs from 'fs';
import path from 'path';
import sequelize from './config';
import { Logger } from '../utils';

const db = {};

export default class DbIniter {

  static async init() {
    const baseName = path.basename(__filename);
    try {
      await sequelize.authenticate();
      Logger.success('Connection to the DB has been established successfully.');
      fs.readdirSync(__dirname)
        .filter(file => {
          return (file.indexOf('.') !== 0) &&
          (file !== baseName) && (file !== 'config.js')
          && (file.slice(-3) === '.js');
        }).forEach(file => {
          const model = sequelize.import(path.join(__dirname, file));
          db[model.name] = model;
        });
      Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
          db[modelName].associate(db);
        }
      });
      sequelize.sync({ alter: true });
    } catch (err) {
      Logger.error('MYSQL ERROR:', err);
    }
    return db;
  }

  static getModel(model) {
    return db[model];
  }

}