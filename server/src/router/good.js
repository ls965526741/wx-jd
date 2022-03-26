const Router = require('koa-router')
const router = new Router({ prefix: '/good' })

const seq = require('../db/seq')
const { DataTypes } = require('sequelize')
const Category = seq.define(
  'good',
  {
    category_id: DataTypes.STRING,
    shop_id: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    img_url: DataTypes.STRING,
    uprice: DataTypes.STRING,
    num: DataTypes.STRING,
    detail: DataTypes.STRING,
    comment_num: DataTypes.STRING,
    hot: DataTypes.STRING,
    special: DataTypes.STRING,
    search_hot: DataTypes.STRING
  },
  { tableName: 'zd_good', timestamps: false }
)

// 创建商品和商品图片的关联
const Shop = seq.define(
  'shop_info',
  {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    category_id: DataTypes.STRING
  },
  { tableName: 'zd_shop', timestamps: false }
)
Category.belongsTo(Shop, { foreignKey: 'shop_id' })

// 创建关联
const GoodImg = seq.define(
  'good_img',
  { category_id: DataTypes.STRING, image_url: DataTypes.STRING },
  { tableName: 'zd_good_img', timestamps: false }
)
Category.belongsTo(GoodImg, { foreignKey: 'id', otherKey: 'category_id' })

// 获取所有商品 page size
const findAll = async ctx => {
  const { page = 1, size = 10 } = ctx.query
  const offset = (page - 1) * size
  const result = await Category.findAndCountAll({
    offset: offset,
    limit: size * 1,
    include: {
      model: Shop,
      attributes: ['id', 'name', 'address']
    }
  })
  ctx.body = {
    code: 200,
    message: '获取商品列表成功',
    result
  }
}
// 获取商品详情
const detail = async ctx => {
  console.log(ctx.query)
  const { id } = ctx.query
  const res = await Category.findOne({
    where: { id },
    include: {
      model: Shop,
      attributes: ['id', 'name', 'address']
    }
  })
  const images = await GoodImg.findAll({
    where: { category_id: id },
    attributes: ['image_url']
  })
  ctx.body = {
    code: 200,
    message: '获取商品列表成功',
    result: { goods: res, images }
  }
}
// 根据category_id分类获取商品
const recommend = async ctx => {
  const { page = 1, size = 10, id } = ctx.query
  const offset = (page - 1) * size
  const res = await Category.findAndCountAll({
    offset: offset,
    limit: size * 1,
    where: { category_id: id },
    include: {
      model: Shop,
      attributes: ['id', 'name', 'address']
    }
  })
  ctx.body = {
    code: 200,
    message: '获取商品列表成功',
    result: res
  }
}
router.get('/', findAll)
router.get('/recommend', recommend)
router.get('/detail', detail)
module.exports = router
