const mixin = require('merge-descriptors');
const debug = require('debug')('min-connect');
const finalhandler = require('finalhandler');
const urlParser = require('url').parse;
const proto = {}; 

function createServer(){
    function app(req, res, next){
        app.handle(req, res, next);
    }
    mixin(app, proto, false);
    app.stack = []; 
    return app;
}

proto.use = function(route, fn){
    var path = route, 
    handle = fn;

    if(typeof route === 'function'){
        path = '/';
        handle = route;
    }

    this.stack.push({
        route: path,
        handle
    });
};

proto.handle = function(req, res, out){
    var index = 0;
    var stack = this.stack;
    var done = out || finalhandler(req, res, { onerror: logerror });

    function next(err){
        var layer = stack[index++];
        // 没有了
        if(layer === undefined){
            return done();
        }

        var route = pathFormat(layer.route);
        var pathname = pathFormat(urlParser(req.url).pathname || '/');

        if(route !== '' && pathname !== route){
            next(err);
            return;
        }

        call(layer.handle, err, req, res, next);
    }

    next();
};

function call(handle, err, req, res, next){
    var error = err;
    var hasError = Boolean(err);
    var argLen = handle.length;
    
    try {
        if(hasError && argLen === 4){
            handle(err, req, res, next);
            return;
        }
        else {
            handle(req, res, next);
            return;
        }
    } catch (e) {
        console.log('出错了',e);
        error = e;
    }

    next(error);
}

function logerror (err) {
    console.error(err.stack || err.toString())
}

// pathname进行小写转换，并且去尾巴的 '/'
function pathFormat(route){
    route = route.toLowerCase();
    if(route.length >0 && route.lastIndexOf('/') === route.length - 1){
        route = route.substr(0, route.length-1);
    }
    return route
}

exports = module.exports = createServer;