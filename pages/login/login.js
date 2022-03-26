// pages/login/login.js
import { login } from '../../api/index'
import Toast from '@vant/weapp/toast/toast'

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
  async login() {
    const { username, password, errorUserName, errorPwd } = this.data
    if (!errorUserName && !errorPwd && username && password) {
      const res = await login({ username, password })
      if (!res) return Toast.fail({ message: '用户登录失败' })

      wx.setStorageSync('token', res.token)
      wx.setStorageSync('userInfo', JSON.stringify(res.result.user_info))
      if (this.options.redirect) {
        wx.navigateBack()
      } else {
        wx.switchTab({ url: '/pages/index/index' })
      }
    }
  },
  onLoad: function (options) {},

  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
