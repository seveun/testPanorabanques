import express from 'express';
import Promise from 'bluebird';
import { renderOk } from '../utils';
import ClientRoutes from './Client.routes';

export const routes = [
  ...ClientRoutes,
];

export const createRouter = (app) => {
  const router = express.Router();
  routes.forEach((r) => {
    router[r.method.toLowerCase()](r.path, (req, res, next) => {
      Promise.each(r.validators, validator => validator(req, res))
        .then(() => r.handler(req, res))
        .then(data => renderOk(res, data))
        .catch(next);
    });
  });

  app.use(router);
};