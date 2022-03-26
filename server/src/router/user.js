const Router = require('koa-router')
const router = new Router({ prefix: '/user' })

const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'xzd'
const { auth } = require('../middleware/auth')

const seq = require('../db/seq')
const { DataTypes } = require('sequelize')

const User = seq.define(
  'user',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING
  },
  { tableName: 'zd_user', timestamps: false }
)
// 创建关联
const UserInfo = seq.define(
  'user_info',
  {
    user_id: DataTypes.STRING,
    user_img: {
      type: DataTypes.STRING,
      defaultValue: 'img/ed3e5493045d980e29c648b3aa83b6ce.jpg'
    },
    job: DataTypes.STRING,
    birthday: DataTypes.STRING,
    gender: DataTypes.STRING,
    nickname: DataTypes.STRING,
    personalized: DataTypes.STRING
  },
  { tableName: 'zd_userinfo', timestamps: false }
)
User.belongsTo(UserInfo, { foreignKey: 'id', otherKey: 'user_id' })

const crpytPassword = async (ctx, next) => {
  console.log(ctx.request.body)
  const password = ctx.request.body.password + ''

  const salt = bcrypt.genSaltSync(10)
  // hash保存的是 密文
  const hash = bcrypt.hashSync(password, salt)
  ctx.request.body.password = hash
  await next()
}

const register = async ctx => {
  const { username, password } = ctx.request.body
  const res = await User.count({ where: { username } })
  if (res === 0) {
    await User.create({ username, password, user_info: {} }, { include: [UserInfo] })
    ctx.body = {
      code: 200,
      message: '用户创建成功'
    }
  } else {
    ctx.body = {
      code: 400,
      message: '用户名已经存在'
    }
  }
}

const getUerInfo = async ctx => {
  const where = {}
  const { id, username, email, password } = ctx.request.body
  id && Object.assign(where, { id })
  username && Object.assign(where, { username })
  email && Object.assign(where, { email })

  const res = await User.findOne({
    attributes: ['id', 'username', 'password'],
    where,
    include: {
      attributes: ['job', 'user_img', 'gender', 'nickname', 'personalized', 'birthday'],
      model: UserInfo
    }
  })
  // 密码对比
  let comparePwd = bcrypt.compareSync(password + '', res.dataValues.password)
  if (comparePwd) {
    ctx.body = {
      code: 200,
      message: '登陆成功',
      token: jwt.sign(res.dataValues, JWT_SECRET, { expiresIn: '1d' }),
      result: {
        user_info: res.dataValues.user_info
      }
    }
  } else {
    ctx.body = {
      code: 400,
      message: '登陆失败'
    }
  }
}

const updateUserInfo = async ctx => {
  const { id } = ctx.state.user
  const content = ctx.request.body
  console.log(content)
  let res = await UserInfo.update(content, { where: { user_id: id } })
  if (res) {
    let result = await UserInfo.findOne({ where: { user_id: id } })
    ctx.body = {
      code: 200,
      message: '修改成功',
      result
    }
  } else {
    ctx.body = {
      code: 400,
      message: '修改失败'
    }
  }
}

const updateById = async ctx => {
  const { id } = ctx.state.user
  const password = ctx.request.body
  const [res] = await User.update(password, { where: { id } })
  if (res) {
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
const upload = async (ctx, next) => {
  const { file } = ctx.request.files
  const fileTypes = ['image/jpeg', 'image/png']
  if (file) {
    if (!fileTypes.includes(file.type)) {
      return ctx.app.emit('error', unSupportedFileType, ctx)
    }
    ctx.body = {
      code: 200,
      message: '商品图片上传成功',
      result: {
        img: `img/${path.basename(file.path)}`
      }
    }
  } else {
    return ctx.app.emit('error', fileUploadError, ctx)
  }
}

// 注册接口
router.post('/register', crpytPassword, register)

// 修改密码接口
router.patch('/', auth, crpytPassword, updateById)

// // 登录接口
router.post('/login', getUerInfo)

router.post('/userInfo', auth, updateUserInfo)

router.post('/upload', auth, upload)

module.exports = router
