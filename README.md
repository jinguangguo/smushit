# smushit - 封装使用

主要对现有的[smushit](https://github.com/colorhook/node-smushit)这个图片优化服务进行一定的封装。

### 依赖
smushit模块及log4js模块

### 使用

```shell
node image_smushit.js
```

会看到，如——


```javascript
[smushit] start smash ./static/img/index.jpg
[smushit] start smash ./static/img/sprite.png
[smushit] item: ./static/img/sprite.png saving: 7.01%
[smushit] item: ./static/img/index.jpg saving: 10.60%
[smushit] smushit completed: total 2, saving 2
[2014-09-03 20:17:44.131] [INFO] [default] - 图片总个数：2
[2014-09-03 20:17:44.136] [INFO] [default] - 无损压缩图片总个数：2
[2014-09-03 20:17:44.136] [INFO] [default] - 输入需要压缩的图片总大小：678949 Bytes
[2014-09-03 20:17:44.137] [INFO] [default] - 输出经过压缩的图片总大小：607394 Bytes
[2014-09-03 20:17:44.138] [INFO] [default] - -------------共节省大小：71555 Bytes
[2014-09-03 20:17:44.139] [INFO] [default] - 压缩率（相对输入图片总大小）：10.54%
```
