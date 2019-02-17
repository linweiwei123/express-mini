const http = require('http');

var response = Object.create(http.ServerResponse.prototype);

response.render = function (name, options, callback) {
    // response运行时已经是res的原型，固可取到res上的内容
    let app = this.app;
    let next = this.next;
    let _this = this;

    callback = callback || function(err, html){
        if(err){
            console.log('模板引擎运行出错了', err);
            return next(err);
        }
        _this.end(html);
    };

    app.render(name, options, callback);
};

module.exports = response;