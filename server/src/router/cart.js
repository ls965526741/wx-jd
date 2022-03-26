const Router = require('koa-router')
const router = new Router({ prefix: '/cart' })
const { auth } = require('../middleware/auth')

const { Op } = require('sequelize')
const seq = require('../db/seq')
const { DataTypes } = require('sequelize')
const Cart = seq.define(
  'cart',
  {
    user_id: DataTypes.STRING,
    goods_id: DataTypes.STRING,
    goods_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    created: DataTypes.STRING,
    deleted: DataTypes.STRING,
    selected: {
      type: DataTypes.NUMBER,
      defaultValue: 1
    }
  },
  { tableName: 'zd_cart', timestamps: false }
)

// 创建关联
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
const Creator = Cart.belongsTo(Category, { foreignKey: 'goods_id', otherKey: 'category_id' })

// ----------------------------------------------------

// 购物车列表
const findAll = async ctx => {
  const { id } = ctx.state.user
  const res = await Cart.findAll({
    where: { user_id: id },
    attributes: ['goods_id', 'goods_num', 'selected'],
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

// 修改购物车
const edit = async ctx => {
  const user_id = ctx.state.user.id
  const { goods_id, ...agrs } = ctx.request.body
  console.log(agrs, goods_id)
  const [res] = await Cart.update(agrs, { where: { user_id, goods_id } })
  console.log(res)
  // 3. 返回结果
  if (res === 1) {
    ctx.body = {
      code: 200,
      message: '修改成功'
    }
  } else {
    ctx.body = {
      code: 400,
      message: '修改失败'
    }
  }
}

// 删除购物车
const remove = async ctx => {
  const user_id = ctx.state.user.id
  const { goods_id } = ctx.request.body
  const res = await Cart.destroy({ where: { user_id, goods_id } })
  if (res === 1) {
    ctx.body = {
      code: 200,
      message: '删除成功'
    }
  } else {
    ctx.body = {
      code: 400,
      message: '删除失败'
    }
  }
}
// 添加购物车
const add = async ctx => {
  const { goods_id } = ctx.request.body
  const user_id = ctx.state.user.id
  //  根据user_id和goods_id同时查找, 有没有记录
  const res = await Cart.findOne({
    where: {
      [Op.and]: {
        user_id,
        goods_id
      }
    }
  })
  if (res) {
    // 已经存在一条记录, 将number + 1
    await res.increment('goods_num')
    res.reload()
  } else {
    Cart.create({
      user_id,
      goods_id
    })
  }
  ctx.body = {
    code: 200,
    message: '添加成功'
  }
}
// 全选
const selectAll = async ctx => {
  const user_id = ctx.state.user.id
  const { selected } = ctx.request.body
  await Cart.update({ selected }, { where: { user_id } })
  ctx.body = {
    code: 200,
    message: '添加成功'
  }
}

// ----------------------------------------------------

// 3.1 添加到购物车接口: 登录, 格式
router.get('/', auth, findAll)
router.post('/', auth, add)
router.put('/', auth, edit)
// 3.4 删除购物车
router.post('/remove', auth, remove)

// 3.5 全选与全不选
router.post('/selectAll', auth, selectAll)

module.exports = router
