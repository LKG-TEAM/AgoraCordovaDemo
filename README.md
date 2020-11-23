# CDVYogaAgoraRTC插件对应Demo

**CDVYogaAgoraRTC插件地址：<https://github.com/LKG-TEAM/CDVYogaAgoraRTC.git>**

## 具体使用
 详见[/www/js/index.js](https://github.com/LKG-TEAM/AgoraCordovaDemo/blob/main/www/js/index.js)文件

## 布局约束规则

#### 只支持如下方式
- margin
- width、height

#### 宏观规则
不建议使用负数
- 数值<0，表示该约束不起作用
- 0<数值<=1，表示按百分比计算约束(参照物为Cordova的UIViewController)
- 数值>0，表示绝对值布局

`1.margin，我们设置的规则是：从左至右，从上至下.`

` 2.即左边距优先级>右边距，上边距优先级>下边距.`

`3.插件内默认上下左右边距都是-0.01，所以想要视图居右(下)，只要设置右(下)>=0即可`

`4.想要已经设置了右(下)的视图，再居左(上)，只需设置右(下)<0即可`

`5.我们定义margin的四个值在0-1之间为百分比约束`

#### Demo安装
请扫码安装
![Pandao editor.md](https://github.com/LKG-TEAM/AgoraCordovaDemo/blob/main/images/QR.png "Pandao editor.md")

#### 截图

![Pandao editor.md](https://github.com/LKG-TEAM/AgoraCordovaDemo/blob/main/images/IMG_5797.PNG "Pandao editor.md")