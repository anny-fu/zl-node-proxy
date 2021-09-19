# zl-node-proxy
使用node开发的一个请求代理模块

### 安装模块
```js
 npm i zl-node-proxy -D
```

### 使用此代理模块（以react项目为例）

由于此代理服务端口和react页面服务**不是**同一个端口，所以不会和react项目中已经开启的代理服务进行冲突，即可以两个代理服务共用

1. 在react项目根目录创建配置文件 zl_node_proxy.config.js
![bb](/assets/bb.png)
```js
let createProxyServe = require("zl-node-proxy");
//构造代理请求服务器
createProxyServe({
    port: 3125, //代理服务的端口，默认3123
    proxyUrlObj: {// 两个代理地址
        "/proxyUrl1": "http://problemset-test.geeklamp.cn",
        "/proxyUrl2": "http://baidu.com",
    },
    headers: ["content-type"],//表示只允许转发content-type请求头
});
// headers参数说明：headers也可以为Boolean类型，为true表示转发所有的请求头，为false表示不转发任何请求头

```

1. 在react项目的package.json中的start脚本命令中追加命令：node ./zl_node_proxy.config.js
   ![cc](/assets/cc.png)
```js
如：
原本的start命令：  "start": "react-scripts start",
修改后的start命令："start": "react-scripts start | node ./zl_node_proxy.config.js",
```
3. 在项目中使用此代理服务，具体两点
     1. 在react项目的入口文件中向React对象添加代理地址变量,如下
      ![dd](/assets/dd.png)
      ```js
         // 设置了两个代理地址（需要注意的是下面的端口需要和代理地址的端口保持一致）
          React.$proxyUrl1="http://127.0.0.1:3125/proxyUrl1";
          React.$proxyUrl2="http://127.0.0.1:3125/proxyUrl2";
      ```
      2. 在具体组件中使用这个代理，如下
        ![66](/assets/66.png)
      ```js
      请求示例：
              var url = React.$proxyUrl1 + '/problems/tags/all';
              axios.get(url).then(d => console.log(d.data));
            }}> /problems/tags/all 

      具体组件示例：

      import React from 'react';
      import axios from 'axios';
      import logo from './logo.svg';
      import './App.css';
      
      function App() {
        return (
          <div className="App">
            <button onClick={() => {
              var url = React.$proxyUrl1 + '/problems/tags/all';
              axios.get(url).then(d => console.log(d.data));
            }}> /problems/tags/all 
          </button>
      
            <br />
      
            <button onClick={() => {
              var url = React.$proxyUrl1 + '/problems';
              var data = {
                "title": "测试12",
                "difficulty": "SIMPLE",
                "topicTags": [
                  "栈",
                  "数组"
                ],
                "codeSnippets": [
                  {
                    "lang": "C++",
                    "code": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n * int val;\n * ListNode *next;\n * ListNode() : val(0), next(nullptr) {}\n * ListNode(int x) : val(x), next(nullptr) {}\n * ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n\n }\n};"
                  },
                  {
                    "lang": "Java",
                    "code": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n * int val;\n * ListNode next;\n * ListNode() {}\n * ListNode(int val) { this.val = val; }\n * ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n\n }\n}"
                  }
                ],
                "description": "<p>hello</p>"
              };
              axios.post(url, {
                data: data
              }).then(d => console.log(d.data));
            }}>  /problems</button>
      
            <br />

    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>


          </div>
        );
      }
      
      export default App;
      
      ```

4.  启动服务 ：npm run start

5. 运行测试
   ![aa](/assets/aa.png)
   