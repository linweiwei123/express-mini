const http = require('http');
const path = require('path');
const express = require('../src/express.js');
const app = express();
const compression = require('compression');
const morgan = require('morgan');

app.use(morgan('combined'));
app.use(compression());

// app.get('/user',
//     (req, res, next) => {
//         console.log('进入了user 中间件1');
//         next('出错了');
//     },
//     (err, req, res, next) => {
//         console.log('进入了user 中间件2');
//         next(err);
//     }
// );
//
// app.post('/add', (req, res, next) => {
//     console.log('进入了add router');
// });
//
// app.use(function (req, res) {
//     res.end('hello from minConnnect');
// });

app.static('public');

app.set('views', 'views');
app.set('view cache', true);
app.engine('ejs');

app.get('/user', function (req, res, next) {
    res.render('index.html', { title:'Hello,I am express-mini! ', name: 'lww'})
});

const server = http.createServer(app);
server.listen(8000);