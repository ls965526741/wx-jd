// pages/cart/cart.js
import { getCart, putCart, removeCart, selectAll } from '../../api/index'
import Toast from '/@vant/weapp/toast/toast'
import Dialog from '/@vant/weapp/dialog/dialog'
Page({
  data: {
    list: [],
    checked: false,
    defaultAddress: {},
    allPrice: '',
    dialogLogin: false,
    isLogin: false
  },
  onLoad: function (options) {},
  async getList(callback) {
    const { result } = await getCart().catch(err => {})
    callback && callback()
    if (result) {
      this.setData({ list: result })
      this.getAllPrice()
      this.getChacked()
    }
  },
  // 修改商品购买数量
  async changeNumber(e) {
    const index = e.currentTarget.dataset.index
    const params = { goods_id: this.data.list[index].goods_id, goods_num: e.detail }
    const res = await putCart(params)
    if (res) {
      this.setData({ [`list[${index}].goods_num`]: e.detail })
      this.getAllPrice()
    }
  },
  // 删除购物车
  async removeList(e) {
    const res = await removeCart({ goods_id: e.currentTarget.dataset.index })
    if (res) {
      Toast('删除商品成功')
      this.getList()
    }
  },
  // 单个商品是否选中
  async onChangeSelected(e) {
    const index = e.currentTarget.dataset.index
    const { goods_id, selected } = this.data.list[index]
    const res = await putCart({ goods_id, selected: selected ? 0 : 1 })
    if (res) {
      await this.setData({ [`list[${index}].selected`]: e.detail })
      this.getChacked()
      this.getAllPrice()
    }
  },
  // 全选 全不选
  async checkAll() {
    const checked = !this.data.checked

    await selectAll({ selected: checked })
    this.data.list.forEach((item, index) => {
      this.setData({ [`list[${index}].selected`]: checked })
    })
    this.setData({ checked })
    this.getAllPrice()
  },

  // 计算商品的总价格
  getAllPrice() {
    const allPrice =
      this.data.list
        .reduce((a, b) => (b.selected ? a + b.good.uprice * b.goods_num : a), 0)
        .toFixed(2) || 0
    this.setData({ allPrice })
  },
  // 计算全选和不全选
  getChacked() {
    const checked = this.data.list.findIndex(item => !item.selected) === -1
    this.setData({ checked })
  },

  onReady: function () {},

  onShow: function () {
    this.getTabBar().setData({ active: 2 })
    const token = wx.getStorageSync('token')
    if (!token) {
      this.setData({ list: [], isLogin: false })
      if (!this.data.dialogLogin) {
        this.setData({ dialogLogin: true })
        Dialog.confirm({
          message: '你还没有登录，请先登录'
        })
          .then(() => {
            wx.navigateTo({ url: '/pages/login/login' })
          })
          .catch(() => {})
      }
    } else {
      this.setData({ isLogin: true })
      this.getList()
    }
  },

  onPullDownRefresh: function () {
    this.setData({ list: [] })
    this.getList(wx.stopPullDownRefresh)
  },

  onReachBottom: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
