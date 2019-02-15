const utils = require('./utils');
const urlParser = require('url').parse;

function Router(options){
    options = options || {};
    this.stack = [];
}

Router.prototype.middlewareInit = function(req, res, out){

    let index = 0;
    let stack = this.stack;

    function next(err) {
        let layer = stack[index++];
        let hasError = Boolean(err);

        // 如果没有了则结束中间件，走下一个中间件
        if(!layer){
            return hasError ? out(err) : out();
        }

        let route = utils.pathFormat(layer.path);
        let pathname = utils.pathFormat(urlParser(req.url).pathname || '/');

        // 进行过滤
        if(route!== '' && route !== pathname){
            return next(err);
        }

        executeHandles(layer.handles, err, req, res, next);
    }

    next();
};

Router.prototype.addRoute = function(path, handles){
    let layer = {
      path,
      handles
    };
    this.stack.push(layer);
};

function executeHandles(handles, err, req, res, out){
   let index = 0;

   function next(err){
       let handle = handles[index++];
       if(!handle){
           out(err);
           return;
       }

       executeSingleHandle(handle, err, req, res, next);
   }

   next(err);

}

function executeSingleHandle(handle, err, req, res, next){
    let error = err;
    let hasError = Boolean(err);
    let argLen = handle.length;

    try{
        if(!hasError || argLen === 4){
            return handle(req, res, next);
        }
        else {
            return handle(err, req, res, next);
        }
    }
    catch (e) {
        error = e;
    }
    next(error);
}

module.exports = Router;