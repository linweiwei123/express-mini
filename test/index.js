const http = require('http');
const miniConnect = require('../src/connect.js');
const app = miniConnect();
const compression = require('compression');
const morgan = require('morgan');

app.use(morgan('combined'));
app.use(compression());

app.use('/test', function(req, res, next){
    console.log('进入了test');
    next();
});

app.use('/foo', function(req, res, next){
    console.log('进入了foo');
    next();
});

app.use(function (req, res) {
    res.end('hello from minConnnect');
});

const server = http.createServer(app);
server.listen(8000);