// pages/register/register.js
import { register } from '../../api/index'
import Toast from '@vant/weapp/toast/toast'
import Dialog from '@vant/weapp/dialog/dialog'
Page({
  data: {
    username: 'admin',
    password: '123123',
    errorUserName: '',
    errorPwd: ''
  },
  validateUserName() {
    const regUser = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/
    const message = regUser.exec(this.data.username) ? '' : '请保证用户名格式正确'
    this.setData({ errorUserName: message })
  },
  validatePwd() {
    const regUser = /^(\w){6,20}$/
    const message = regUser.exec(this.data.password) ? '' : '请保证密码格式正确'
    this.setData({ errorPwd: message })
  },
  async register() {
    const { username, password, errorUserName, errorPwd } = this.data
    if (!errorUserName && !errorPwd && username && password) {
      const res = await register({ username, password })
      if (!res) return Toast.fail({ message: '用户注册失败' })
      Dialog.confirm({
        message: '点击确定前往登录'
      })
        .then(() => {
          wx.redirectTo({ url: '/pages/login/login' })
        })
        .catch(() => {})
    }
  }
})
