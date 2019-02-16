var cons = require('consolidate');
var path = require('path');
var fs = require('fs');

/***
 *
 * @param page
 * @param config
 * @constructor
 */
function View(page, config){
    console.log('view 初始化');
    this.engine = config.engine || 'ejs';
    this.templatePath = path.join(config.root, config.viewPath, page);
    this.lookup();
}

//检测模板是否存在
View.prototype.lookup = function(){
    if(!fs.existsSync(this.templatePath)){
        console.log('模板没有找到');
        throw new Error('模板没有找到');
    }
};

View.prototype.render = function (options, fn) {
    let templatePath= this.templatePath;
    return cons[this.engine](templatePath, options, fn);
};

module.exports = View;