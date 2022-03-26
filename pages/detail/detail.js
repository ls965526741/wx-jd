// pages/detail/detail.js
import { getDetail, addCart } from '../../api/index'
import Dialog from '/@vant/weapp/dialog/dialog'
Page({
  data: {
    goodsInfo: {},
    swiperList: [],
    parameter: []
  },

  onLoad: function (options) {
    this.getList()
  },
  async getList() {
    const { code, result } = await getDetail({ id: this.options.id })
    if (result) {
      this.setData({ goodsInfo: result.goods, swiperList: result.images })
      const parameter = result.goods.detail
        .trim()
        .split('\n')
        .filter(item => item)
        .map(item => item.split(':'))
      this.setData({ parameter })
    }
  },
  async addCart() {
    const token = wx.getStorageSync('token')
    if (!token) {
      return Dialog.confirm({
        title: '你还未登陆',
        message: '是否前往登陆'
      })
        .then(() => {
          wx.navigateTo({ url: '/pages/login/login?redirect=true' })
        })
        .catch(() => {})
    } else {
      const res = await addCart({ goods_id: this.options.id })
      if (res.code === 200) {
        this.show = false
        Dialog.confirm({
          title: '添加商品成功',
          message: '是否前往购物车'
        })
          .then(() => {
            wx.switchTab({ url: '/pages/cart/cart' })
          })
          .catch(() => {})
      }
    }
  },
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
