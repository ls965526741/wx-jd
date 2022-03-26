const Router = require('koa-router')
const router = new Router({ prefix: '/order' })
const { auth } = require('../middleware/auth')

const seq = require('../db/seq')
const { DataTypes } = require('sequelize')
const Order = seq.define(
  'order',
  {
    goods_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
    cart_id: DataTypes.STRING,
    address_id: DataTypes.STRING,
    price: DataTypes.STRING,
    count: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 0
    },
    flag: DataTypes.STRING,
    order_no: DataTypes.STRING
  },
  { tableName: 'zd_orders', timestamps: false }
)

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
Order.belongsTo(Category, { foreignKey: 'goods_id', otherKey: 'category_id' })

// -----------------------start-----------------------------

const findAll = async ctx => {
  const { id } = ctx.state.user
  const res = await Order.findAndCountAll({
    where: { user_id: id },
    include: {
      model: Category
    }
  })
  // 3. 返回结果
  ctx.body = {
    code: 200,
    message: '获取商品列表成功',
    result: res
  }
}
const create = async ctx => {
  const order = ctx.request.body
  const user_id = ctx.state.user.id
  order.forEach(item => {
    item.user_id = user_id
  })
  await Order.bulkCreate(order)
  ctx.body = {
    code: 200,
    message: '添加商品订单成功'
  }
}

const update = async ctx => {
  const { id, ...status } = ctx.request.body
  await Order.update({ status }, { where: { id } })
}

// -----------------------end-----------------------------

// 获取订单列表
router.get('/', auth, findAll)

// 提交订单
router.post('/', auth, create)

// 更新订单状态
router.patch('/:id', auth, update)

module.exports = router
