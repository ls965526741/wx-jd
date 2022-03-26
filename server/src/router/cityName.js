const Router = require('koa-router')
const router = new Router({ prefix: '/cityName' })

const seq = require('../db/seq')
const { DataTypes } = require('sequelize')
const Cart = seq.define(
  'city',
  {
    name: DataTypes.STRING,
    fename: DataTypes.STRING,
    ename: DataTypes.STRING,
    pid: DataTypes.STRING,
    level: DataTypes.STRING,
    region: DataTypes.STRING,
    map_x: DataTypes.STRING,
    map_y: DataTypes.STRING,
    map_z: DataTypes.STRING,
    orders: DataTypes.STRING,
    status: DataTypes.STRING,
    istop: DataTypes.STRING,
    city_id: DataTypes.STRING,
    city_area: DataTypes.STRING
  },
  { tableName: 'zd_city', timestamps: false }
)

// ----------------------------------------------------

// 购物车列表
const findAll = async ctx => {
  const res = await Cart.findAll({
    // attributes: ['goods_id', 'goods_num'],
  })
  // 3. 返回结果
  ctx.body = {
    code: 200,
    message: '获取商品列表成功',
    result: res
  }
}

// ----------------------------------------------------

// 3.1 添加到购物车接口: 登录, 格式
router.get('/', findAll)

module.exports = router
