(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('express'), require('axios')) :
    typeof define === 'function' && define.amd ? define(['express', 'axios'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['zl-docx2html'] = factory(global.express, global.axios));
}(this, (function (express, axios) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
    var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

    // var axios = require('axios');
    function proxyReq(proxyUrlObj, headersVal) {
        return function route(req, res) {
            // 获取请求方式，路径，body,query,header
            let method = req.method;
            let url = req.originalUrl;
            let body = req.body;
            let headers = req.headers;
            // console.log("====method,url,body,headers==", method, url, body, headers);

            //根据设置的代理路径，得到真正的url
            for (let path in proxyUrlObj) {
                let reg = new RegExp("^" + path);
                if (reg.test(url)) {
                    url = proxyUrlObj[path] + url.replace(reg, "");
                    break;
                }
            }
            // console.log("====url==", url);

            // 根据请求头过滤配置得到要向后端传递的请求头
            if (typeof headersVal == 'boolean') {
                if (!headersVal) {  //拒绝任何请求头
                    headers = {};
                }
            }
            if (headersVal instanceof Array) {
                let newHeader = {};
                headersVal.forEach(name => {
                    newHeader[name] = headers[name];
                });
                headers = newHeader;
            }
            // console.log("====headers==", headers);
            let option = {
                method: method,
                url: url,
                data: body,
                headers: headers
            };
            console.log("============"+req.originalUrl+" 代理请求信息==============\n", JSON.stringify(option, null, 4));
            // 发送 POST 请求
            axios__default['default'](option).then(d => {
                console.log("========"+req.originalUrl+" 代理请求结果==============\n", JSON.stringify(d.data, null, 4));
                res.send(d.data);
            });
        }
    }

    // const express = require('express');


    /**
     * @function createProxyServe
     * @description 用于构造代理请求的模块
     * @param {object} proxyUrlObj 代理地址，可配置多个，对象的每个键值对代表一个代理请求
     * @param {array|boolean} headers 当headers为数组时，代表实际转发给后端的请求头信息|当headers为布尔值类型时，true：代表转发所有的请求头，false:代表转发所有的请求头都进行转发
     * @example
     * // 两个代理地址
     * let proxyUrlObj = {
     *     "/api": "http://problemset-test.geeklamp.cn",
     *     "/api2": "http://baidu.com",
     * };
     * // 请求头信息
     * //let headers = false; //不转发任何请求头
     * //let headers = true; //转发所有的请求头
     * let headers = ["content-type"];//只允许转发content-type请求头

     * 
     * //构造代理请求服务器
     * createProxyServe(proxyUrlObj, headers);
     */
    function createProxyServe(proxyUrlObj, headers) {
        const app = express__default['default']();
        const hostName = '0.0.0.0';  //有时127.0.0.1不能以本机IP地址访问，这时就可以尝试使用0.0.0.0
        const port = 3000;
        app.use(express__default['default'].json());
        app.use(express__default['default'].urlencoded({ extended: false }));
        //设置跨域访问（设置在所有的请求前面即可）
        app.all("*", function (req, res, next) {
            //设置允许跨域的域名，*代表允许任意域名跨域
            res.header("Access-Control-Allow-Origin", "*");
            //接收ajax请求手动提交的cookie信息
            res.header("Access-Control-Allow-Credentials", true);
            //允许的header类型
            res.header("Access-Control-Allow-Headers", "content-type");
            //跨域允许的请求方式
            res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
            if (req.method == 'OPTIONS')
                res.sendStatus(200); //让options尝试请求快速结束
            else
                next();
        });
        app.use('*', proxyReq(proxyUrlObj, headers));
        app.listen(port, hostName, function () {
            console.log(`代理服务：http://${hostName}:${port}`);
        });
    }

    // let createProxyServe = require("./module/createProxyServe");

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

    return createProxyServe;

})));
