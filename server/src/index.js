import 'babel-polyfill';
import _Promise from 'bluebird';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import * as _controllers from './controllers';
import * as _services from './services';

import { renderBackendError, Logger } from './utils';
import DbIniter from './models';

global.rootpath = __dirname;
global.Promise = _Promise;
global.controllers = _controllers;
global.services = _services;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

DbIniter.init().then(() => {
  app.listen(process.env.PORT, () => {
    Logger.info(`Listen on port ${process.env.PORT}`);
  });
});

const { createRouter } = require('./routes');

createRouter(app);
app.use((err, req, res) => renderBackendError(res, err));