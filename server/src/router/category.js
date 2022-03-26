const Router = require('koa-router')
const router = new Router({ prefix: '/category' })

const seq = require('../db/seq')
const { DataTypes } = require('sequelize')
const Category = seq.define(
  'category',
  { name: DataTypes.STRING, pid: DataTypes.STRING },
  { tableName: 'zd_category', timestamps: false }
)

const findAll = async ctx => {
  const res = await Category.findAndCountAll()
  // 3. 返回结果
  ctx.body = {
    code: 200,
    message: '获取商品列表成功',
    result: res
  }
}

router.get('/', findAll)
module.exports = router
