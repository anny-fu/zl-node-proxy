let createProxyServe = require("./index.js");
// 两个代理地址
let proxyUrlObj = {
    "/api": "http://problemset-test.geeklamp.cn",
    "/baidu": "http://baidu.com",
};
// 允许通过的请求头
let headers = ["content-type"];

//构造代理请求服务器
createProxyServe(proxyUrlObj, headers);