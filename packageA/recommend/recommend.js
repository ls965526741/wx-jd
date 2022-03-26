// packageA/recommend/recommend.js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../store/index'
import { getRecommend } from '../../api/index'
Page({
  options: {
    pureDataPattern: /^_/
  },
  data: {
    _page: 1,
    _size: 10,
    _total: '',
    _isLoading: false,
    activeKey: 0,
    list: [],
    recommendId: 3
  },

  onLoad: async function (options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['categoryList'],
      actions: ['getCategoryList']
    })
    await this.getCategoryList()
    console.log(this.data.categoryList)
    this.getList()
  },
  onUnload: function () {
    this.storeBindings.destroyStoreBindings()
  },
  // 获取分类商品
  async getList(callback) {
    const { _size, _page } = this.data
    const params = { page: _page, size: _size, id: this.data.recommendId }
    this.setData({ _isLoading: true })
    const res = await getRecommend(params)
    this.setData({ _isLoading: false })
    callback && callback()
    const list = [...this.data.list, ...res.result.rows]
    this.setData({ list, _total: res.result.count })
  },
  sidebarChange(e) {
    this.setData({ list: [] })
    this.setData({ recommendId: e.currentTarget.dataset.index })
    this.getList()
  },

  onPullDownRefresh: function () {
    this.setData({ list: [], _page: 1, _total: '' })
    this.getList(wx.stopPullDownRefresh)
  },

  onReachBottom: function () {
    console.log(1)
    const { _page, _size, _total, _isLoading } = this.data
    if (_page * _size < _total && !_isLoading) {
      this.setData({ _page: _page + 1 })
      this.getList()
    } else {
      Toast('没有更多了')
    }
  },

  onReady: function () {},

  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
