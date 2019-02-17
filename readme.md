### 使用
```javascript
const express = require('../src/express.js');

const app = express();

const server = http.createServer(app);
server.listen(8000);
```
### 中间件
```javascript
app.use(morgan('combined'));
app.use(compression());

app.use(function (req, res) {
    res.end('hello from minConnnect');
});
```

### router
```javascript
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
```

### 模板引擎
支持consolidate支持的所有模板引擎
```javascript
app.set('views', 'views');
app.engine('ejs');

app.get('/user', function (req, res, next) {
    app.render('index.html', { name: 'lww'} , function (err, html) {
        if(err){
            console.log('模板引擎运行出错了', err);
            return next(err);
        }
        res.end(html);
    })
});
```
#### 使用res上的render方法
```javascript
app.get('/user', function (req, res, next) {
    res.render('index.html', { title:'Hello,I am express-mini! ', name: 'lww'})
});
```

#### 设置缓存
```javascript
app.set('view cache', true);
```

### 静态文件支持
```javascript
app.static('public'); // 参数为当前工作目录的对应的文件路径
```