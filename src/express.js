const connect = require('./connect');
const mixin = require('merge-descriptors');
const expressProto = require('./application');

function createApplication(){

    // 生成connect生存的函数
    var express = connect();

    // 混入express的特性
    mixin(express, expressProto, false);

    // 初始化特性
    express.init();
    return express;
}

module.exports = createApplication;
