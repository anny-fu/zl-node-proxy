(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    let createProxyServe = require("./module/createProxyServe");
    module.exports = createProxyServe;

    /*

    -------示例---------------
    // 两个代理地址
    let proxyUrlObj = {
        "/api": "http://problemset-test.geeklamp.cn",
        "/api2": "http://baidu.com",
    };
    // 允许通过的请求头
    let headers = ["content-type"];

    //构造代理请求服务器
    createProxyServe(proxyUrlObj, headers);

    */

})));
