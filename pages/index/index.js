// pages/index/index.js
import { getCategory, getRecommend } from '../../api/index'
import Toast from '@vant/weapp/toast/toast'
Page({
  data: {
    active: '',
    categoryList: [],
    detailList: [],
    total: '',
    size: 10,
    page: 1,
    isLoading: false // getDetail网络请求锁
  },
  async getCategory() {
    const res = await getCategory()
    if (res) {
      this.setData({ categoryList: res.result.rows, active: res.result.rows[0].id })
    }
  },
  async getDetail(callback) {
    const { active, size, page, isLoading } = this.data
    this.setData({ isLoading: true })
    const res = await getRecommend({ id: active, page, size })
    callback && callback()
    this.setData({ isLoading: false })
    if (res) {
      const { rows, count } = res.result
      const detailList = [...this.data.detailList, ...rows]
      this.setData({ total: count, detailList })
    }
  },
  onChange(e) {
    this.setData({ detailList: [], page: 1, total: '', active: e.detail.name })
    this.getDetail()
  },
  onLoad: async function (options) {
    await this.getCategory()
    this.getDetail()
  },
  toMenu() {
    wx.reLaunch({
      url: `/packageA/recommend/recommend`
    })
  },

  onReachBottom: function () {
    const { page, size, total, isLoading } = this.data
    if (page * size < total && !isLoading) {
      this.setData({ page: page + 1 })
      this.getDetail()
    } else {
      Toast('没有跟多了')
    }
  },
  onPullDownRefresh: async function () {
    this.setData({ detailList: [], page: 1, total: '' })
    !this.data.active && (await this.getCategory())
    this.getDetail(wx.stopPullDownRefresh)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().setData({ active: 0 })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
