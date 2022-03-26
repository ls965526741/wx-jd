# 微信原生开发小程序 vant/weapp+MobX

## 前言

该项目是对 vue-JD 项目对微信小程序的迁移，使用的后端接口都一样，部分实现功能不一致

## 前端

### 技术栈

```
vant/weapp
mobx-miniprogram
mobx-miniprogram-bindings
```

### 安装依赖

```
npm install
```

### 运行项目

```
使用微信开发者工具打开，修改appID
```

### 实现功能

#### 用户登陆模块

- 账号密码登陆
- token 验证
- 退出登陆

#### 购物车模块

- 添加购物车
- 删除购物车
- 购物车异步更改数量
- 购物车异步更改选中状态
- 购物车全选，非全选

#### 商品展示模块

- 商品分类展示
- 实现长列表滚动加载
- 商品详情展示

#### 页面权限管理模块

- 使用 onShow 判断用户是否登陆，未登陆不允许访问
- 登陆后重定向到之前的页面

#### 支付模块

- 未实现

#### 订单模块

- 未实现

#### 地址管理模块

- 未实现

## 后端

### 安装依赖

```
cd server
npm install
```

### 连接 mysql 服务器

```js
// server/src/config/config.js

module.exports = {
  MYSQL_HOST: 'localhost',
  MYSQL_PORT: '3306',
  MYSQL_USER: '', // 账号
  MYSQL_PWD: '', // 密码
  MYSQL_DB: '' // 数据库名
}
```

### 导入数据库

```js
//文件在server/src/db中自行导入
```

### 运行项目

```js
cd server
npm run dev
// or
npm run dev
```

### 部分截图

#### 主页面

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e3306813-c467-4fe2-a5b0-4f80a8d3051e/0de2f2f8-c627-4723-8d7c-0cef8a9548f6.png" style="width:100%; margin-top:10px;" alt="">

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e3306813-c467-4fe2-a5b0-4f80a8d3051e/65363d0d-a9d5-456b-b407-0bd8f27b34ec.png" style="width:100%; margin-top:10px;" alt="">

#### 详情页

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e3306813-c467-4fe2-a5b0-4f80a8d3051e/92271261-c03d-4586-bfbc-ea3c210eb682.png" style="width:100%; margin-top:10px;" alt="">

#### 购物车

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e3306813-c467-4fe2-a5b0-4f80a8d3051e/f2658663-f1f5-412f-becc-b61896f047dc.png" style="width:100%; margin-top:10px;" alt="">

#### 地址管理

#### 个人中心

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e3306813-c467-4fe2-a5b0-4f80a8d3051e/76d93400-cf08-48a0-8fc4-317343686835.png" style="width:100%; margin-top:10px;" alt="">

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e3306813-c467-4fe2-a5b0-4f80a8d3051e/21b238c7-2e8c-4eea-b277-853441cd8805.png" style="width:100%; margin-top:10px;" alt="">

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e3306813-c467-4fe2-a5b0-4f80a8d3051e/9ad9a4e0-f0e3-42d0-ad87-571b1e2c5e6c.png" style="width:100%; margin-top:10px;" alt="">

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e3306813-c467-4fe2-a5b0-4f80a8d3051e/f0c3dc2f-9fc6-4d66-94b2-89f4ded42af1.png" style="width:100%; margin-top:10px;" alt="">
## 关于我

##### QQ：965536741
