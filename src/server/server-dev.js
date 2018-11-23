import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware'
import config from '../../webpack.dev.config.js'

const app = express();
const PORT = process.env.PORT || 8080;
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.get('*', (req, res, next) => {
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
    if (err) {
      return next(err);
    }

    console.log('Result: ', result);

    res.set('content-type', 'text/html');
    res.send(result);
  })
});


app.listen(PORT, () => {
  console.log(`Served fresh daily on PORT ${PORT}`);
});
