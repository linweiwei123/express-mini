const methods = require('methods');
const Router = require('./router');

const app = exports = module.exports = {};

app.init = function(){
    this._router = new Router();
    this.usedRouter = false;
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