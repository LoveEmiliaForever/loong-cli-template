# Vue-Scss-Ts 脚手架模板

作者：[GitHub:LoveEmiliaForever](https://github.com/LoveEmiliaForever)  
完成时间：2024.3.11  
可用技术：Vue、CSS、SCSS、JS、TS

## 初始化

```shell
npm install
```

## 开发运行

```shell
npm run dev
```

`dev-webpack-server`将运行在`http://localhost:7782`之上  

## 打包上线

```shell
npm run dll
npm run build
```

输出文件将放在`/dist`文件夹下  

## 其余配置

可自行更改`package.json`中的`script`选项

* 去除`webpack-dashboard -- `可以让打包命令以正常方式输出信息
* 设置`SOURCEMAP=false`可不生成`sourceMap`
