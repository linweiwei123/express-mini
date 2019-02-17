const setprototypeof = require('setprototypeof');

module.exports.middlewareInit = function (app) {
    return function (req, res, next) {
        // 给req， res增加属性与方法
        // setprototypeof(res, app.response);

        console.log(app.response.render)

        res.__proto__ = app.response;

        // console.log(res);
        req.res = res;
        res.req = req;
        req.app = app;
        res.app = app;
        res.next = next;
        next();
    }
};