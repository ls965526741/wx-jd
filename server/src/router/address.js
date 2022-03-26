const Router = require('koa-router')
const router = new Router({ prefix: '/address' })
const { auth } = require('../middleware/auth')

const seq = require('../db/seq')
const { DataTypes } = require('sequelize')
const Address = seq.define(
  'address',
  {
    user_id: DataTypes.STRING,
    addressinfo: DataTypes.STRING,
    isdefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    phone: DataTypes.STRING,
    addressarea: DataTypes.STRING,
    sname: DataTypes.STRING
  },
  { tableName: 'zd_address', timestamps: false }
)

const create = async ctx => {
  const addr = ctx.request.body
  const user_id = ctx.state.user.id
  const res = await Address.create({ ...addr, user_id })
  ctx.body = {
    code: 200,
    message: '创建地址成功',
    result: res
  }
}
const findAll = async ctx => {
  const { id } = ctx.state.user
  const { count, rows } = await Address.findAndCountAll({
    where: { user_id: id },
    attributes: ['id', 'isdefault', 'addressinfo', 'phone', 'addressarea', 'sname']
  })
  ctx.body = {
    code: 200,
    message: '获取地址列表成功',
    total: count,
    result: rows
  }
}
const update = async ctx => {
  const addr = ctx.request.body
  const id = ctx.request.params.id
  const res = await Address.update(addr, { where: { id } })
  if (res) {
    ctx.body = {
      code: 200,
      message: '修改成功'
    }
  }
}
const remove = async ctx => {
  const id = ctx.request.params.id
  const res = await Address.destroy({ where: { id } })
  ctx.body = {
    code: 200,
    message: '删除成功',
    result: res
  }
}
const setDefault = async ctx => {
  const user_id = ctx.state.user.id
  const id = ctx.request.params.id
  await Address.update(
    { isdefault: 0 },
    {
      where: {
        user_id
      }
    }
  )
  const count = await Address.update(
    { isdefault: 1 },
    {
      where: {
        id
      }
    }
  )
  if (count) {
    ctx.body = {
      code: 200,
      message: '更改成功'
    }
  }
}
router.post('/', auth, create)
router.get('/', auth, findAll)
// 3.3 更新地址
router.put('/:id', auth, update)
// 3.4 删除地址
router.delete('/:id', auth, remove)
// // 3.5 设置默认
router.patch('/:id', auth, setDefault)
module.exports = router
