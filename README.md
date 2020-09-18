# 移动端开发node后台
暂应用于移动端注册登录开发
---------
### 接口配置
#### 接口文档：

| 接口名（用途） | 地址 |  参数   |
| --------    | :----- | :----:  |
| 验证码获取  | /getCaptcha  |   （无）    |
| 手机号登录 | /telLogin  |   （无）   |
| 注册 |  /register  |  （无）  |
| 账号密码登录 |  /login  |（无）|

#### 接口配置文件：
basePath/router/index.js

---------
### 数据库配置
#### 配置文件：
basePath/db/index.js
#### 相关说明：
选用mongodb数据库，非关系型数据库，数据类型Bson，强于Json的数据类型，可包含二进制字符。
BSON（/ˈbiːsən/）是一种计算机数据交换格式，主要被用作MongoDB数据库中的数据存储和网络传输格式。它是一种二进制表示形式，能用来表示简单数据结构、关联数组（MongoDB中称为“对象”或“文档”）以及MongoDB中的各种数据类型。BSON之名缘于JSON，含义为Binary JSON（二进制JSON）。
mongodb默认接口 27017

---------
### 工具配置
#### 短信运营商：
选用容联云通信，基于java请求文档编写完成javascript工具脚本

---------
### 数据格式配置
#### 配置文件：
basePath/model/index.js
#### 相关说明：
```javascript
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
	data: {
		type: String, // 类型
		required: true, // 是否必须
		unique: true // 独特（不可重复）
	}
})

module.exports = mongoose.model('Data', dataSchema);
```
