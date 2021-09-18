const express = require('express');
const proxyReq = require('./proxyReq');


/**
 * @function createProxyServe
 * @description 用于构造代理请求的模块
 * @param {object} proxyUrlObj 代理地址，可配置多个，对象的每个键值对代表一个代理请求
 * @param {array|boolean} headers 当headers为数组时，代表实际转发给后端请求头信息|当headers为布尔值类型时，true：代表转发所有的请求头，false:代表转发所有的请求头都进行转发
 * @example
 * // 两个代理地址
 * let proxyUrlObj = {
 *     "/api": "http://problemset-test.geeklamp.cn",
 *     "/api2": "http://baidu.com",
 * };
 * // 允许通过的请求头
 * let headers = ["content-type"];
 * 
 * //构造代理请求服务器
 * createProxyServe(proxyUrlObj, headers);
 */
function createProxyServe(proxyUrlObj, headers) {
    const app = express();
    const hostName = '0.0.0.0';  //有时127.0.0.1不能以本机IP地址访问，这时就可以尝试使用0.0.0.0
    const port = 3000;
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
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
module.exports = createProxyServe;





