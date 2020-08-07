南方科大量子互动
===========================

###########环境依赖
node v0.10.28+
reids ~
java jdk1.8

###########部署步骤
1. 添加系统环境变量
    export $PORTAL_VERSION="production" // production, test, dev


2. npm install  //安装node运行环境

3. gulp build   //前端编译



###########目录结构描述
├── Readme.md                   // help
├── 量子                         // 应用
├── 量子                      // 配置
│   ├── package.json		//安装node服务器的lib包
│   ├── manifest.json       // app打包的视图文件
│   ├── control.sh         // 启动node的linux服务器端运行脚本
│   ├── index.js                // node服务器的入口文件
│   ├── dbqs.js              // 前端数据库配置文件
│   ├── controlapi.sh         // 启动后端服务器的linux运行脚本
│   
├── data
├── doc                         // 文档

├── node_modules
├── package.json
├── html                      // web静态资源加载
│   └── pages
│       └── *.html       // h5端页面
└── tools



###########V1.0.0 版本内容
1. 新功能   注册登录
2. 新功能   记录当前关卡信息