const methods = require('methods');
const Router = require('./router');
const View = require('./view');
const serveStatic = require('serve-static');

const app = exports = module.exports = {};

app.init = function(){
    this.settings = {};
    this._router = new Router();
    this.usedRouter = false;
    this.cache = {};
    Object.defineProperty(this, 'router', {
        configurable : true,
        enumerable : true,
        get: function () {
            this.usedRouter = true;
            return this._router.middlewareInit.bind(this._router);
        }
    })
};

methods.forEach(method => {
    app[method] = function (path) {
        // 如果首次调用则放入路由中间价
        if(!this.usedRouter){
            this.use(this.router);
        }

        // 加入stack
        this._router.addRoute(path, Array.prototype.slice.call(arguments, 1))
        
    }
});

// express设置属性
app.set = function(key, value){
    if(this.settings.hasOwnProperty(key)){
        return this.settings[key];
    }
    this.settings[key] = value;
};

app.engine = function(engine){
    this.settings['engine'] = engine;
};

app.render = function (name, options, fn) {

    let cacheTemplate = this.cache[name];

    let view = cacheTemplate || new View(name, {
        root: process.cwd(),
        viewPath: this.settings['views'],
        engine: this.settings['engine']
    });

    if(!cacheTemplate && this.settings['view cache']){
        this.cache[name] = view;
    }

    view.render(options, fn);
};

app.static = function (dir) {
    console.log(process.cwd());
    this.use(serveStatic(process.cwd() + '/' + dir), {});
};