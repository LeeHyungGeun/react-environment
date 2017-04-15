import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../config/webpack.config.dev';
import open from 'open';
import colors from 'colors';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

let webpackDevMiddlewareInstance = require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    quiet: true    // display nothing to the console
});
app.use(webpackDevMiddlewareInstance);

app.use(require('webpack-hot-middleware')(compiler));

app.use('*', function(req, res, next) {
    let filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, function(err, result) {
        if (err) {
            return next(err);
        }
        res.set('content-type','text/html');
        res.send(result);
        res.end();
    });
});

app.listen(port, function(err) {
    if (err) {
        console.error(err);
    }
    else {
        // open(`http://localhost:${port}`);

        // to wait until Webpack Dev Server loaded.
        webpackDevMiddlewareInstance.waitUntilValid(() => {
            open(`http://localhost:${port}`);
        });   
    }
});