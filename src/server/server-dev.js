// setup env variables
require('dotenv').config()

// SILENCE ERROR IN PROD
if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ silent: true });
}

import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import express from 'express';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware'
import config from '../../webpack.dev.config.js'

const PORT = process.env.PORT || 8080;
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const compiler = webpack(config);

// EXPRESS APP
const app = express();

// WEBPACK DEV MIDDLEWARE
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// MIDDLEWARE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// http request logger
switch (app.get('env')) {
  case 'production':
    app.use(morgan('combined'));
    break;
  case 'development':
    app.use(morgan('dev'));
    break;
  default:
    console.log('No logging done by morgan.');
}

app.get('*', (req, res, next) => {

  console.log('Did we make it?');

  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
    if (err) {
      return next(err);
    }

    console.log('Result: ', result);

    res.set('content-type', 'text/html');
    res.send(result);
  })
});

// ERROR HANDLING
app.use(function(err, req, res, next) {
  console.error(err.message);

  // If no specified error code, set to 'Internal Server Error (500)'
  if (!err.statusCode) {
    err.statusCode = 500;
  }

  // All HTTP requests must have a response
  // Send error with status code and message
  res.status(err.statusCode).send(err.message);
});

// START SERVER!!!
app.listen(PORT, function() {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Served fresh daily on PORT: ', PORT);
  }
});
