const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const logger = require('./utils/logger');
const initControllers = require('./controllers');
const initStores = require('./stores/index');
const routes = require('./routes');
const createError = require('./utils/errors');

module.exports = (config) => {
  logger.info('App: starting');

  const app = express();
  app.use(cors());
  app.use(cookieParser());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const dependencies = {
    stores: initStores(config.mongodb),
  };

  const controllers = initControllers(dependencies);

  routes(app, controllers);

  app.use((req, res, next) => {
    next(createError(`${req.method} - ${req.path} not found`, 404));
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message.message || err.message);
  });

  logger.info('App: started');
  return app;
};
