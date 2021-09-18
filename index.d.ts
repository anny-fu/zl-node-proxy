export = createProxyServe;
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
declare let createProxyServe: any;
