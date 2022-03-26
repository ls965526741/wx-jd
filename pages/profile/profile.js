// pages/profile/profile.js
import Dialog from '/@vant/weapp/dialog/dialog'
Page({
  data: {
    isLogin: false,
    userInfo: {}
  },
  logout() {
    Dialog.confirm({
      message: '点击确定将退出登陆'
    })
      .then(() => {
        wx.clearStorage()
        this.setData({ isLogin: false, userInfo: {} })
      })
      .catch(() => {})
  },

  onLoad: function (options) {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({ isLogin: userInfo ? true : false, userInfo: JSON.parse(userInfo) })
    }
  },

  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().setData({ active: 3 })
  },

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
