// pages/menu/menu.js
import { getGoods } from '../../api/index'
import Toast from '/@vant/weapp/toast/toast'
Page({
  options: {
    pureDataPattern: /^_/ // 指定所有 _ 开头的数据字段为纯数据字段
  },
  data: {
    _page: 1,
    _size: 10,
    _total: '',
    _isLoading: false,
    goodsList: [],
    swiperList: [
      { image: '/static/swiper/l1.jpg', id: 1 },
      { image: '/static/swiper/l2.jpg', id: 2 },
      { image: '/static/swiper/l3.jpg', id: 3 },
      { image: '/static/swiper/l4.jpg', id: 4 },
      { image: '/static/swiper/l5.jpg', id: 5 },
      { image: '/static/swiper/l6.jpg', id: 6 },
      { image: '/static/swiper/l7.jpg', id: 7 },
      { image: '/static/swiper/l8.jpg', id: 8 }
    ],
    addSynth: true,
    addSale: true,
    addPrice: true
  },
  async getList() {
    const { _page, _size } = this.data
    this.setData({ _isLoading: true })
    const params = { page: _page, size: _size }
    wx.showLoading()
    const res = await getGoods(params)
    wx.hideLoading()
    this.setData({ _isLoading: false })
    if (res) {
      const goodsList = [...this.data.goodsList, ...res.result.rows]
      this.setData({ goodsList, _total: res.result.count })
    }
  },
  onLoad: function (options) {
    this.getList()
  },

  onPullDownRefresh: async function () {
    this.setData({ goodsList: [], _pages: 1, _total: '' })
    await this.getList()
    wx.stopPullDownRefresh()
  },

  onReachBottom: function () {
    const { _page, _size, _total, _isLoading } = this.data
    if (_page * _size < _total && !_isLoading) {
      this.setData({ _page: _page + 1 })
      this.getList()
    } else {
      Toast('没有更多了')
    }
  },

  onReady: function () {},

  onShow: function () {
    this.getTabBar().setData({ active: 1 })
  },

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
