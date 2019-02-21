以cube-ui为例，基于vue cli3的多项目开发环境配置。

支持同一套环境下的多个项目开发，可以通过动态的指定项目名实现vue cli3下的serve、build、lint开发

```bash
$ cd client-src
$ npm install
$ npm run start
```
## note
- build命令需要自行补充 client-src/qn.cof.js中的信息，若没有，需注释vue.config.js中QiniuPlugin插件
- command choice 仅支持 serve、build、lint
- project name必须存在src目录下
- 项目入口文件假设为main.js


