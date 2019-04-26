const express = require('express');
const body = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

const app = express();
const router = express.Router();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
        color: true,
        chunk: false
    }
}))

app.use(webpackHotMiddleware(compiler));
app.use(express.static(__dirname));
app.use(body.json());
app.use(body.urlencoded({extended: true}));

router.get('/simple/get', function (req, res) {
    res.json({
        msg: 'hello world'
    })
})

app.use(router)

module.exports = app.listen(8080, () => {
    console.log(`server listening at 8080`)
})
