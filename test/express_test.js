const http = require('http');
const express = require('../src/express.js');
const app = express();
const compression = require('compression');
const morgan = require('morgan');

app.use(morgan('combined'));
app.use(compression());

app.get('/user',
    (req, res, next) => {
        console.log('进入了user 中间件1');
        next('出错了');
    },
    (err, req, res, next) => {
        console.log('进入了user 中间件2');
        next(err);
    }
);

app.post('/add', (req, res, next) => {
    console.log('进入了add router');
});

app.use(function (req, res) {
    res.end('hello from minConnnect');
});

const server = http.createServer(app);
server.listen(8000);